"""Exercise content changes and preserve font rendering across used weights."""

import importlib.util
import tempfile
import unittest
from pathlib import Path

from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.ttLib import TTFont

SPEC = importlib.util.spec_from_file_location(
    "subset_fonts", Path(__file__).with_name("subset-fonts.py")
)
fonts = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(fonts)


def layout_features(font, table):
    return {record.FeatureTag for record in font[table].table.FeatureList.FeatureRecord}


class FontSubsetTests(unittest.TestCase):
    def test_all_sources_and_decoded_text_are_included(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory)
            (source / "content.ts").write_text(
                'export const text = "Äöüß · Pokémon – …";', encoding="utf-8"
            )
            (source / "dialog.tsx").write_text(
                r'<p>&euro; &#x2191; {"\u2122\u{2193}\xE7"}</p>', encoding="utf-8"
            )
            (source / "style.css").write_text(
                r'a::before { content: "\2212"; }', encoding="utf-8"
            )
            (source / "generated").mkdir()
            (source / "generated/stale.ts").write_text('"ñ"', encoding="utf-8")
            characters = fonts.source_characters(source)
            self.assertTrue(set(map(ord, "ÄÖÜäöüß ·éÉ–…€↑↓™ç−")) <= characters)
            self.assertTrue(set(range(0x20, 0x7F)) <= characters)
            self.assertNotIn(ord("ñ"), characters)
            # Content added after an earlier generation must enter the next subset.
            (source / "content.ts").write_text(
                'export const text = "ñ";', encoding="utf-8"
            )
            self.assertIn(ord("ñ"), fonts.source_characters(source))

    def test_subset_regenerates_when_content_changes(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory)
            content = source / "content.ts"
            output = source / "font.woff2"
            original = (
                fonts.ROOT
                / "node_modules/@fontsource-variable/roboto-flex/files/roboto-flex-latin-wght-normal.woff2"
            )
            content.write_text('"Hello"', encoding="utf-8")
            fonts.subset_font(original, output, fonts.source_characters(source))
            with TTFont(output) as font:
                self.assertNotIn(ord("é"), font.getBestCmap())
            content.write_text('"Pokémon"', encoding="utf-8")
            fonts.subset_font(original, output, fonts.source_characters(source))
            with TTFont(output) as font:
                self.assertIn(ord("é"), font.getBestCmap())

    def test_variable_outlines_metrics_layout_and_licenses_survive(self):
        characters = fonts.source_characters(fonts.ROOT / "src")
        with tempfile.TemporaryDirectory() as directory:
            for slug, _family in fonts.FONTS:
                with self.subTest(font=slug):
                    original = (
                        fonts.ROOT
                        / "node_modules/@fontsource-variable"
                        / slug
                        / "files"
                        / f"{slug}-latin-wght-normal.woff2"
                    )
                    output = Path(directory) / f"{slug}.woff2"
                    supported = fonts.subset_font(original, output, characters)
                    first_output = output.read_bytes()
                    fonts.subset_font(original, output, characters)
                    self.assertEqual(first_output, output.read_bytes())
                    self.assertLess(output.stat().st_size, original.stat().st_size)
                    with TTFont(original) as before, TTFont(output) as after:
                        self.assertEqual(set(after.getBestCmap()), supported)
                        self.assertEqual(
                            before["fvar"].compile(before), after["fvar"].compile(after)
                        )
                        self.assertEqual(
                            before["name"].getDebugName(13),
                            after["name"].getDebugName(13),
                        )
                        self.assertEqual(
                            before["name"].getDebugName(14),
                            after["name"].getDebugName(14),
                        )
                        for table in ("GSUB", "GPOS"):
                            self.assertEqual(
                                layout_features(before, table),
                                layout_features(after, table),
                            )
                        for weight in (400, 500, 600, 650):
                            before_glyphs = before.getGlyphSet(
                                location={"wght": weight}
                            )
                            after_glyphs = after.getGlyphSet(location={"wght": weight})
                            for character in supported:
                                first = before_glyphs[before.getBestCmap()[character]]
                                second = after_glyphs[after.getBestCmap()[character]]
                                self.assertEqual(first.width, second.width)
                                first_pen = DecomposingRecordingPen(before_glyphs)
                                second_pen = DecomposingRecordingPen(after_glyphs)
                                first.draw(first_pen)
                                second.draw(second_pen)
                                self.assertEqual(first_pen.value, second_pen.value)


if __name__ == "__main__":
    unittest.main()

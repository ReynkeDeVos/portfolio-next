# Monatliche Sicherheitsprüfung der Abhängigkeiten

Geprüft am 2026-10-02. Ursprüngliches Ziel: einmal monatlich nach bekannten schweren Sicherheitslücken suchen und bei verfügbarer Korrektur automatisch einen Pull Request erstellen. Recherche anhand offizieller Dokumentation und des Aube-Quellcodes der im Projekt verwendeten Version 2.6.1. Eine zwischenzeitliche Reparatur-Automatisierung mit eigenen PRs wurde wieder entfernt; heute lässt der Check-Workflow bei `aube audit --audit-level high` fehlschlagen. Die folgenden Abschnitte dokumentieren den ursprünglichen Recherchestand.

## Empfehlung für dieses Repository

Eine geplante **GitHub Action mit `aube audit`** passt am besten zu den vorhandenen Anforderungen. „Schwer“ würde ich als **`high` und `critical`** definieren. Die Action prüft den tatsächlich festgeschriebenen Abhängigkeitsbaum, aktualisiert betroffene Pakete, prüft das Ergebnis und erstellt einen PR. Das ist eine Empfehlung aus dem folgenden Vergleich, keine Behauptung, dass ein fertiger Bot alle Fälle dieses Projekts bereits unterstützt.

Lokaler Befund: `package.json` nennt `aube@2.6.1`, das einzige Projekt-Lockfile ist `aube-lock.yaml`, Node wird ab Version 24 unterstützt. Die vorhandenen Skripte `check` und `build` eignen sich als Prüfung der Aktualisierung. GitHub meldet das Repository derzeit als privat. Ein ausschließlich lesender Aufruf von `aube audit --audit-level high --json` meldete heute keine Advisories; auch sämtliche Schweregrad-Zähler waren null, bei 431 erfassten Abhängigkeiten. Das ist eine Momentaufnahme der abgefragten Datenbank, keine Prüfung bislang unbekannter Schwachstellen.

## Kann Aube das?

Ja. Aube bietet eine Abfrage der Advisory-Datenbank der Registry, einen Schweregradfilter und eine maschinenlesbare JSON-Ausgabe. Für das gewünschte Niveau:

```bash
aube audit --audit-level high --json
```

`high` umfasst auch `critical`; die dokumentierte Reihenfolge lautet `info`, `low`, `moderate`, `high`, `critical`. Ohne `--prod` oder `--dev` wird der gesamte erreichbare Baum betrachtet. [Aube-Befehlsreferenz](https://aube.sh/cli/audit.html), [Aube 2.6.1: Audit-Implementierung](https://github.com/jdx/aube/blob/v2.6.1/crates/aube/src/commands/audit.rs).

Als Reparaturversuch:

```bash
aube audit --audit-level high --fix=update
```

`--fix=update` aktualisiert das Lockfile; das einfache `--fix` schreibt dagegen Overrides in `package.json`. [Aube-Befehlsreferenz](https://aube.sh/cli/audit.html).

Der Quellcode von **2.6.1** klärt Details, die für die Automation wichtig sind:

- Der Schweregradfilter greift vor der Reparaturauswahl. Niedrigere Advisories lösen somit keine eigenen Reparaturen aus.
- Bei gewöhnlichen Bereichen wie `^1.2.0` bleibt der Manifest-Eintrag bestehen, wenn die korrigierte Version hineinpasst. Die verwendete Version steigt dann im Lockfile.
- Der Update-Modus liefert bei verbleibenden ausgewählten Advisories Exitcode 1. Overrides allein liefern keinen verlässlichen Nachweis einer erfolgreichen Reparatur.
- Im JSON sind `advisories` nach Schweregrad gefiltert, die `metadata.vulnerabilities`-Zähler erfassen hingegen sämtliche Schweregrade.

[Aube 2.6.1: Audit-Implementierung und Tests](https://github.com/jdx/aube/blob/v2.6.1/crates/aube/src/commands/audit.rs).

Eine Grenze: bei den hier verwendeten Caret-Bereichen sucht der Resolver die sichere Ersatzversion **innerhalb des erlaubten Bereichs**. Ist erst eine neue Hauptversion sicher, reicht `--fix=update` nicht aus. Exakte direkte Versionspins werden für die Reparatursuche gesondert geöffnet. [Aube 2.6.1: Auswahl nicht verwundbarer Versionen](https://github.com/jdx/aube/blob/v2.6.1/crates/aube-resolver/src/resolve/vulnerable.rs), [Audit-Implementierung](https://github.com/jdx/aube/blob/v2.6.1/crates/aube/src/commands/audit.rs).

Für solche Fälle braucht die spätere Umsetzung einen gezielten Manifest-Upgrade-Schritt. Bei transitiven Paketen kann außerdem die Aktualisierung des übergeordneten Pakets erforderlich sein. Als Umsetzungspolitik empfehle ich, nicht automatisch beliebige Overrides zu erzwingen, sondern einen nicht vollständig lösbaren Fall sichtbar zu melden. Sinnvolle Teilkorrekturen können als Draft-PR erscheinen, mit ausdrücklich aufgeführten verbleibenden Lücken und Testproblemen.

Falls ausdrücklich die Untergrenze in `package.json` steigen soll, etwa `^1.2.0` → `^1.2.4`, muss die Automation das zusätzlich gezielt erledigen. Für die tatsächliche Installation schützt bereits das aktualisierte Lockfile zusammen mit einer eingefrorenen Installation. `aube ci` verlangt ein passendes committed Lockfile. [Aube: CI und Container](https://aube.sh/package-manager/ci.html).

## Vergleich der Wege

| Weg                   | Eignung für diesen konkreten Wunsch                                                                                                                                                                                                                                                                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub Actions + Aube | Monatlicher Zeitpunkt und Schweregrad lassen sich ausdrücklich festlegen; verwendet den vorhandenen Paketmanager. Empfehlung, mit gezieltem Fallback für außerhalb des Versionsbereichs liegende Reparaturen.                                                                                                                                                                    |
| Dependabot            | Bequemer Standard für unterstützte Lockfiles und zeitnahe Sicherheits-PRs. Aube ist in GitHubs unterstützten Ökosystemen nicht aufgeführt. Die Unterstützung des vollständigen `aube-lock.yaml`-Baums ist damit nicht belegt. [GitHub: unterstützte Ökosysteme](https://docs.github.com/en/code-security/reference/supply-chain-security/supported-ecosystems-and-repositories). |
| Renovate              | Unterstützt npm-Abhängigkeiten und Sicherheits-PRs; die dokumentierten Lockfiles des npm-Managers sind `package-lock.json`, `pnpm-lock.yaml` und `yarn.lock`. Keine dokumentierte native Aube-Lockfile-Unterstützung. [Renovate: npm-Manager](https://docs.renovatebot.com/modules/manager/npm/).                                                                                |
| npm audit             | Fachlich passende Prüfung, aber npm verlangt standardmäßig sein eigenes Lockfile beziehungsweise Shrinkwrap. `--no-package-lock` berechnet den Baum neu und kann andere Ergebnisse liefern. Für dieses Aube-Projekt daher unnötiger Umweg. [npm: audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/).                                                                     |

Ein monatliches `schedule.interval` bei Dependabot betrifft **Versionsupdates**, die auch ohne Sicherheitslücke entstehen. Sicherheitsupdates reagieren auf Alerts und wählen die kleinste Version mit Patch; sie werden dadurch nicht zu einem monatlichen Sicherheitsjob. [Dependabot-Konfigurationsreferenz](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference#schedule), [Dependabot-Sicherheitsupdates](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-security-updates).

Nur schwere Dependabot-PRs lassen sich über eine eigene Auto-Triage-Regel nach `Severity` auswählen. Dafür müssen die gewöhnlichen automatischen Sicherheitsupdates deaktiviert sein. Eigene Regeln sind für öffentliche Repositorys verfügbar; bei privaten Repositorys hängt die Verfügbarkeit von Organisationsbesitz und GitHub Code Security ab. [GitHub: eigene Auto-Triage-Regeln](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/manage-your-dependency-security/auto-triage-dependabot-alerts).

Renovates Sicherheitsupdates verwenden GitHub-Alerts, umgehen den normalen Zeitplan und wählen standardmäßig die niedrigste korrigierte Version. Ein monatlicher gewöhnlicher Renovate-Zeitplan erfüllt die gewünschte Frequenz somit ebenfalls nicht. [Renovate: vulnerabilityAlerts](https://docs.renovatebot.com/configuration-options/#vulnerabilityalerts).

## Vorgeschlagener Ablauf der späteren Action

Diese Schritte sind der Entwurf der Umsetzung:

1. Monatlich den Standardbranch auschecken und die festgelegte Node-/Aube-Version bereitstellen. Zusätzlich einen manuellen Start anbieten. Beispielsweise bedeutet `23 7 1 * *` den ersten Monatstag um 07:23 UTC. GitHub unterstützt Cron und manuelle Workflow-Aufrufe. [GitHub: Workflow-Ereignisse](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).
2. Den unveränderten Lockfile-Baum auf `high` und `critical` prüfen. Bei gültigem, leerem Ergebnis beenden; Datenbank-/Netzwerkfehler separat behandeln.
3. Bei Treffern `--fix=update` versuchen. Noch offene Fälle gezielt behandeln oder als ungelöst melden. Keine pauschale Aktualisierung aller Dependencies auf `latest` vorsehen.
4. Falls gefordert, nur bei betroffenen direkten Dependencies die Manifest-Untergrenze auf die tatsächlich gewählte sichere Version anheben und Manifest/Lockfile wieder synchronisieren.
5. Erneut auditieren: für einen vollständig erfolgreichen Fix keine verbleibenden `high`-/`critical`-Treffer im Baum und keine bekannten Advisories beliebigen Schweregrads in den neu gewählten betroffenen Paketversionen. Unabhängige bestehende `low`-/`moderate`-Treffer sollen einen nützlichen Sicherheits-PR nicht blockieren.
6. Aus dem aktualisierten Lockfile installieren, dann `aubr check` und `aubr build` ausführen. Vor der Veröffentlichung der Änderungen die Ergebnisse erfassen.
7. Einen bestehenden Sicherheits-PR aktualisieren oder einen neuen erstellen. PR-Inhalt: betroffene Advisories, alte/neue Versionen, Test- und Audit-Ergebnis sowie verbleibende Probleme. GitHub CLI unterstützt `gh pr create`. [GitHub-CLI-Referenz](https://cli.github.com/manual/gh_pr_create).

Für PR-Erstellung mit `GITHUB_TOKEN` muss die entsprechende Repository-Einstellung freigegeben sein; Schreibrechte werden im Workflow passend begrenzt. Die GitHub-Dokumentation beschreibt den Schalter unter Actions → General → Workflow permissions. [GitHub: Actions-Einstellungen](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests).

Aktuelle GitHub-Besonderheit: durch `GITHUB_TOKEN` erstellte beziehungsweise aktualisierte PRs lösen ihre `pull_request`-Checks in einem Zustand aus, der eine menschliche Freigabe benötigt. Ein GitHub-App-Token ermöglicht automatisch startende PR-Checks. Für einen einfachen ersten Aufbau kann die Validierung bereits im monatlichen Job erfolgen. [GitHub: Workflow aus einem Workflow auslösen](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow#triggering-a-workflow-from-a-workflow).

## Grenzen der Zusage

Eine sichere veröffentlichte Version muss existieren. Wenn es keinen Patch gibt, kann die Automation keinen korrekten Versions-PR herstellen. Der Lauf sollte das deutlich melden, ohne den Fund mit `--ignore-unfixable` auszublenden. Zudem bedeutet ein leerer Audit-Bericht nur, dass die befragte Advisory-Datenbank keine passenden bekannten Lücken meldet; er ist kein allgemeines Sicherheitssiegel. Die Prüfung bei Aube beziehungsweise npm fragt bekannte Registry-Advisories ab. [Aube-Befehlsreferenz](https://aube.sh/cli/audit.html), [npm: audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/).

GitHub kann geplante Runs verzögern oder bei hoher Last ausfallen lassen. Bei **öffentlichen** Repositorys werden Zeitpläne nach 60 Tagen ohne Repository-Aktivität deaktiviert; das betrifft das aktuell private Repository nicht, wäre aber bei einem späteren Wechsel relevant. Falls der Monatstermin auch bei längerem Stillstand verbindlich bleiben soll, braucht es eine überwachte externe Auslösung. [GitHub: geplante Workflow-Ereignisse](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

Die Recherche und der damalige lesende Audit sind abgeschlossen. Im Recherche-Schritt wurden keine Workflows, Reparaturskripte oder GitHub-Einstellungen angelegt oder geändert. Die spätere Umsetzung ist in [Dependency security automation](dependency-security.md) dokumentiert.

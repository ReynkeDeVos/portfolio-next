// Single domain vocabulary for the risk-tiered AI workflow. Kept free of Zod
// so both schema validation and the browser UI import the same definitions.

const workflowStageIds = ['plan', 'build', 'review', 'ship'] as const;

type WorkflowStageId = (typeof workflowStageIds)[number];

const workflowTierIds = ['small', 'medium', 'high'] as const;

type WorkflowTierId = (typeof workflowTierIds)[number];

const workflowEmphases = ['quiet', 'primary', 'review'] as const;

type WorkflowEmphasis = (typeof workflowEmphases)[number];

type GateKind = 'spec' | 'council';

const stageGateKind: Partial<Record<WorkflowStageId, GateKind>> = {
  plan: 'spec',
  review: 'council',
};

function gateKindFor(id: WorkflowStageId, emphasis: WorkflowEmphasis): GateKind | null {
  return emphasis === 'review' ? (stageGateKind[id] ?? null) : null;
}

const tierRailPulse = {
  small: { accent: 'primary', pace: 'fast' },
  medium: { accent: 'primary', pace: 'default' },
  high: { accent: 'tertiary', pace: 'default' },
} as const satisfies Record<
  WorkflowTierId,
  { accent: 'primary' | 'tertiary'; pace: 'fast' | 'default' }
>;

type StageEntry = {
  id: WorkflowStageId;
  title: string;
  status: string;
  summary: string;
  emphasis: WorkflowEmphasis;
};

type TierWithStages = {
  id: WorkflowTierId;
  stages: readonly StageEntry[];
};

// Groups per-tier stage entries by canonical stage ID so the pipeline renders
// directly from stage identity rather than positional indexing across tiers.
function groupStagesBySlot(tiers: readonly TierWithStages[]) {
  return workflowStageIds.map((stageId) => ({
    id: stageId,
    byTier: tiers.flatMap((tier) => {
      const stage = tier.stages.find((candidate) => candidate.id === stageId);

      return stage ? [{ tierId: tier.id, stage }] : [];
    }),
  }));
}

export {
  gateKindFor,
  groupStagesBySlot,
  tierRailPulse,
  workflowEmphases,
  workflowStageIds,
  workflowTierIds,
};

export type { GateKind, WorkflowEmphasis, WorkflowStageId, WorkflowTierId };

export const TOTAL_CONTRACT = 5002609086.88

export const PORTFOLIO_SUMMARY = [
  { label: 'Gross contract', value: TOTAL_CONTRACT },
  { label: '5% Tax', value: 250130454.344 },
  { label: 'After tax', value: 4752478632.536 },
  { label: '15% Target profit', value: 750391363.032 },
  { label: 'Target direct cost', value: 4002087269.504 },
]

export const STAGES = [
  { k: 'all', l: 'All', c: '#555' },
  { k: 'es', l: 'Early', c: '#D85A30' },
  { k: 'ip', l: 'In progress', c: '#BA7517' },
  { k: 'ot', l: 'On track', c: '#1D9E75' },
  { k: 'nd', l: 'Nearly done', c: '#085041' },
]

export const SORTS = [
  { k: 'ch', l: 'Highest contract' },
  { k: 'cl', l: 'Lowest contract' },
  { k: 'ph', l: 'Most progress' },
  { k: 'pl', l: 'Least progress' },
  { k: 'na', l: 'Name A → Z' },
  { k: 'pk', l: 'Most packages' },
]

export const CHAT_SUGGESTIONS = [
  'Give me a portfolio overview',
  'Which projects are at risk?',
  'Summarize the GVMC cost status',
  'Who has the most packages?',
  "What's Mechanical Works status?",
  'Explain the ₱102M Other costs',
]

export type RequestRow = {
  assignee: string
  key: string
  priority: 'High' | 'Low' | 'Medium'
  status: 'Approved' | 'In Review' | 'Pending' | 'Ready'
  type: string
}

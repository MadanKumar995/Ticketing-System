export interface Ticket {
    ticketId: number;
    userId: number;
    agentId: number;
    ticketType: string;
    severity: number;
    createdDate: string;
    ticketStatus: string;
    openedDate: string
    solvedDate: string;
    preName: string;
    preMobile: string;
    reqName: string;
    reqMobile: string;
    reqEmail: string;
    reason: string;
    remarks: string;
}
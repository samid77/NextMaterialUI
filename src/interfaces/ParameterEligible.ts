export interface ParameterEligible {
    eligible: number;
    ineligible: number;
}

export interface ParameterEligibleState{
    fetch: boolean;
    error: any;
    response: any;
    action: string | null;
    data: ParameterEligible;
}

export interface ParameterEligibleAction{
    type: string;
    data: any;
}
// Betting Results
export type BetResult = "1" | "3" | "5" | "10" | "20" | "77";
export type BetInfo = Record<BetResult, number>;

// User Betting Result
export type UserBetResult = BetResult | "bettingSum";
export type UserBetInfo = Record<UserBetResult, number>;

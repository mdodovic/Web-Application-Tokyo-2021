export class Round {
    sportName: string;
    disciplineName: string;
    gender: string;

    roundNumber: number;

    roundResults: Array<{ player: string, nationality: string, score: string }>;

    type: string;

    forPosition: number;
}
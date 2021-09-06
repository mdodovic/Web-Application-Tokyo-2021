export class Competition {
    sportName: string;
    disciplineName: string;
    initiallySingle: boolean; // to determine if this discipline (!=null) is initially signle to extract players or player
    actAsSingle: boolean; // has group phase or goes to the final round imediatelly
    gender: string;

    possibleLocations: Array<string>;
    begin: string;
    end: string;
    delegate: string;

    groupNumber: number;
    competitorsNumber: number; // num_in_group = competitorsNumber / groupNumber

    roundsNumber: number;

    resultType: string; // points, lenght as mutch as you can collect, time as less as you can collect
    resultFormat: string;
    rankPlayers: boolean; // stable of playing
    comment: string;

    participants: Array<{ nationality: string, representation: string, rank: number }>
}

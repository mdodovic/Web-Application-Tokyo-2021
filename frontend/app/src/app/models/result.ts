import { FinalCollection } from "./finalCollection";
import { GroupCollection } from "./groupCollection";
import { TreeCollection } from "./treeCollection";

export class Result {
    sportName: string;
    disciplineName: string;
    gender: string;

    final: Array<FinalCollection>;
    tree: Array<TreeCollection>;
    group: Array<GroupCollection>;

}
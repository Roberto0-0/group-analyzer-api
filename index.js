import { GroupController } from "./src/adapters/controllers/groupController.js";
import { MemberController } from "./src/adapters/controllers/memberController.js";
import { Analyze } from "./src/Analyze.js";

export const Group = new GroupController(); 
export const Member = new MemberController(); 
export const analyze = new Analyze(); 

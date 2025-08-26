import test from "node:test";
import assert from "node:assert/strict";
import { GroupCreateUsecase } from "../../src/application/usecases/group/groupCreateUsecase.js";
import { GroupInMemoryRespository } from "../../src/infrastructure/repositories/groupInMemoryRespository.js";
import { GroupCreateRequest } from "../../src/application/requests/groupCreateRequest.js";

test("should create group.", () => {
    const groupForm = {
        id: "293902030",
        subject: "group subject",
        ownerId: "2923829303",
        memberCount: 20,
        createdAt: Date.now()
    };

    const request = new GroupCreateRequest(
        groupForm.id,
        groupForm.subject,
        groupForm.ownerId,
        groupForm.memberCount,
        groupForm.createdAt,
    );

    const groupRepository = new GroupInMemoryRespository();
    const createGroupUsecase = new GroupCreateUsecase(groupRepository);
    const response = createGroupUsecase.execute(request);

    if (response instanceof Error) {
        return console.error(response.message);
    }

    assert.equal(response.subject, groupForm.subject);
});

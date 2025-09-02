import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { MemberDeleteByIdUsecase } from "../../src/application/usecases/member/memberDeleteByIdUsecase.js";

test("should delete member by id.", async () => {
    const repository = new MemberSQLiteRespository();

    const id = "29303020@c.us";

    const deleteMemberByIdUsecase = new MemberDeleteByIdUsecase(repository);
    const response = await deleteMemberByIdUsecase.execute(id);

    if (!response.success) assert.fail(response.message);

    console.log(response);

    assert.equal(response.success, true);
});

import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { MemberGetByIdUsecase } from "../../src/application/usecases/member/memberGetByIdUsecase.js";

test("should get member by id.", async () => {
    const repository = new MemberSQLiteRespository();

    const id = "29303020@c.us";

    const getMemberByIdUsecase = new MemberGetByIdUsecase(repository);
    const response = await getMemberByIdUsecase.execute(id);

    if (!response.success) assert.fail(response.message);

    console.log(response);

    assert.equal(response.success, true);
});

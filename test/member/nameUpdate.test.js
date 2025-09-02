import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { MemberNameUpdateUsecase } from "../../src/application/usecases/member/memberNameUpdateUsecase.js";

test("should update member name.", async () => {
    const repository = new MemberSQLiteRespository();

    const id = "29302030@c.us";
    const newName = "Mariana andrade";

    const getMemberByIdUsecase = new MemberNameUpdateUsecase(repository);
    const response = await getMemberByIdUsecase.execute(id, newName);

    assert.equal(response.success, true);
});

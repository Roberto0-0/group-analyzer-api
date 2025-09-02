import test from "node:test";
import assert from "node:assert/strict";
import { MemberSQLiteRespository } from "../../src/infrastructure/repositories/memberSQLiteRepository.js";
import { MemberGetAssociationCountUsecase } from "../../src/application/usecases/member/memberGetAssociationCountUsecase.js";

test("should get member association count.", async () => {
    const repository = new MemberSQLiteRespository();

    const id = "29302030@c.us";

    const getMemberAssociantionCountUsecase = new MemberGetAssociationCountUsecase(repository);
    const response = await getMemberAssociantionCountUsecase.execute(id);

    if (!response.success) assert.fail(response.message);

    console.log(response);

    assert.equal(response.success, true);
});

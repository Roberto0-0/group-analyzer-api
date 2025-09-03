import test from "node:test";
import assert from "node:assert/strict";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { GroupVerifyBlockedModuleUsecase } from "../../src/application/usecases/group/groupVerifyBlockedModuleUsecase.js";

test("should verify block module.", async () => {
    const id = "1293020340";
    const moduleName = "Fun";

    const repository = new GroupSQLiteRespository();
    const verifyBlockedModuleUsecase = new GroupVerifyBlockedModuleUsecase(repository);
    const response = await verifyBlockedModuleUsecase.execute(id, moduleName);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);
});

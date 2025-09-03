import test from "node:test";
import assert from "node:assert/strict";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { GroupBlockModuleUsecase } from "../../src/application/usecases/group/groupBlockModuleUsecase.js";

test("should block module.", async () => {
    const id = "1293020340";
    const moduleName = "Fun";

    const repository = new GroupSQLiteRespository();
    const blockeModuleUsecase = new GroupBlockModuleUsecase(repository);
    const response = await blockeModuleUsecase.execute(id, moduleName);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);
});

import test from "node:test";
import assert from "node:assert/strict";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { GroupUnBlockModuleUsecase } from "../../src/application/usecases/group/groupUnBlockModuleUsecase.js";

test("should unblock module.", async () => {
    const id = "1293020340";
    const moduleName = "Fun";

    const repository = new GroupSQLiteRespository();
    const blockeModuleUsecase = new GroupUnBlockModuleUsecase(repository);
    const response = await blockeModuleUsecase.execute(id, moduleName);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);
});

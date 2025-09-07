import test, { after } from "node:test";
import assert from "node:assert/strict";
import { GroupVerifyBlockedModuleUsecase } from "../../src/application/usecases/group/groupVerifyBlockedModuleUsecase.js";
import { GroupPgRepository } from "../../src/infrastructure/repositories/groupPgRepository.js";
import { db } from "../../src/infrastructure/persistence/dbContext.js";

test("should verify block module.", async () => {
    const id = "1293020340";
    const moduleName = "Fun";

    const repository = new GroupPgRepository();
    const verifyBlockedModuleUsecase = new GroupVerifyBlockedModuleUsecase(repository);
    const response = await verifyBlockedModuleUsecase.execute(id, moduleName);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);

    after(async () => {
        await db.$client.end();
    });
});

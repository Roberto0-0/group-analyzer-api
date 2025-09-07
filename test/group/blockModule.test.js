import test, { after } from "node:test";
import assert from "node:assert/strict";
import { GroupBlockModuleUsecase } from "../../src/application/usecases/group/groupBlockModuleUsecase.js";
import { GroupPgRepository } from "../../src/infrastructure/repositories/groupPgRepository.js";
import { db } from "../../src/infrastructure/persistence/dbContext.js";

test("should block module.", async () => {
    const id = "1293020340";
    const moduleName = "Fun";

    const repository = new GroupPgRepository();
    const blockeModuleUsecase = new GroupBlockModuleUsecase(repository);
    const response = await blockeModuleUsecase.execute(id, moduleName);

    if (!response.success) assert.fail(response.message);

    assert.equal(response.success, true);

    after(async () => {
        await db.$client.end();
    });

});

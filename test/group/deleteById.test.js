import test from "node:test";
import assert from "node:assert/strict";
import { GroupSQLiteRespository } from "../../src/infrastructure/repositories/groupSQLiteRepository.js";
import { GroupDeleteByIdUsecase } from "../../src/application/usecases/group/groupDeleteByIdUsecase.js";

test("should delete group by id.", async () => {
    const id = "293902030";

    const repository = new GroupSQLiteRespository();
    const deleteGroupByIdUsecase = new GroupDeleteByIdUsecase(repository);
    const response = await deleteGroupByIdUsecase.execute(id);

    if(!response.success) assert.fail(response.message);

    assert.equal(response.success, true);
});

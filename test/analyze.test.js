import test from "node:test";
import assert from "node:assert/strict";
import { Analyze } from "../src/Analyze.js";

test("should analyze group chat", async () => {
    const groupChat = {
        groupMetadata: {
            creation: 1665415936,
            size: 1
        },
        participants: [
            {
                id: {
                    _serialized: '29393020300@c.us'
                }
            }
        ],
        id: {
            _serialized: '2930203002029@c.us',
        },
        name: 'vendas',
        lastMessage: {
            _data: {
                notifyName: 'Mariana silva',
                author: [Object],
            },
            hasMedia: false,
            body: "Lorem ipsum dolor sit amet . Os operadores gráficos e tipográficos sabem disso bem, na realidade.",
            author: '29393020300@c.us',
        }
    }

    await (new Analyze().on(groupChat));

    assert.equal(true, true);
});

import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";

import { useLogList } from "./";

const logListMock = jest.fn();

describe("useLogList Hook", () => {
    it("useLogList should call the auditLogProvider's list method with same properties", () => {
        renderHook(
            () =>
                useLogList({
                    resource: "posts",
                    params: { id: 1 },
                    metaData: { fields: ["id", "action", "data"] },
                }),
            {
                wrapper: TestWrapper({
                    auditLogProvider: {
                        list: logListMock,
                    },
                }),
            },
        );

        expect(logListMock).toBeCalledWith({
            resource: "posts",
            params: { id: 1 },
            metaData: { fields: ["id", "action", "data"] },
        });
    });

    it("useLogList should return data with 'posts' resource", async () => {
        const { result, waitFor } = renderHook(
            () => useLogList({ resource: "posts" }),
            {
                wrapper: TestWrapper({
                    auditLogProvider: {
                        list: ({ resource }) => {
                            if (resource === "posts") {
                                return Promise.resolve([
                                    {
                                        id: 1,
                                        action: "create",
                                        data: { id: 1, title: "title" },
                                    },
                                ]);
                            }
                            return Promise.resolve([]);
                        },
                    },
                }),
            },
        );

        await waitFor(() => {
            return result.current?.isFetched;
        });

        expect(result.current?.data).toStrictEqual([
            {
                id: 1,
                action: "create",
                data: { id: 1, title: "title" },
            },
        ]);
    });
});

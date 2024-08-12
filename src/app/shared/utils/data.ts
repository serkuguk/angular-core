interface Item {
    id?: string;
    [key: string]: any;
}

export const extractDocumentChangeActionData = (x: any, addId = true): Item => {
    const data = x.payload.doc.data();

    if (addId) {
        data.id = x.payload.doc.id;
    }

    return data;
};

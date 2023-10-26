import { useReducer, useEffect, useState } from "react";
import { projectFirestore } from "../components/firebase/config";
import { timestamp } from "../components/firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFireStore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCanceled] = useState(false)

    //collection ref
    const ref = projectFirestore.collection(collection)

    //only dispatch if not cancelled

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }


    //add document

    const addDocument = async (doc) => {
        console.log("Adding document:", doc);
        dispatch({ type: 'IS_PENDING' });

        try {
            const createdAt = timestamp.fromDate(new Date());
            const addedDocument = await ref.add({ ...doc, createdAt });
            console.log("Document added:", addedDocument);
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        } catch (err) {
            console.error("Error adding document:", err);
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
        }
    }

    //delete document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const deletedDocument = await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: deletedDocument })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })

        }
    }
    useEffect(() => {
        return () => setIsCanceled(true)
    }, [])

    return { addDocument, deleteDocument, response }

}
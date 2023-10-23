import { useReducer, useEffect, useState } from "react";
import { projectFirestore } from "../components/firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export const useFireStore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCanceled] = useState(false)

    //collection ref
    const ref = projectFirestore.collection(collection)

    //pass in document
    ref.add()

    //add document

    const addDocument = (doc) => {

    }
    //delete document
    const deleteDocument = (id) => {

    }
    useEffect(() => {
        return () => setIsCanceled(true)
    }, [])

    return { addDocument, deleteDocument, response }

}
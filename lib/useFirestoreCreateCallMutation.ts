import {
  addDoc,
  collection,
  DocumentData,
  Firestore,
} from "firebase/firestore";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { useFirestore } from "./FirestoreProvider";
import { CALL_QUERY_KEY } from "./useFirestoreCallQuery";

export function useFirestoreCreateCallMutation(
  options?: UseMutationOptions<DocumentData, unknown, DocumentData>
) {
  const db = useFirestore();
  const queryClient = useQueryClient();
  return useMutation<DocumentData, unknown, DocumentData>(
    (data: DocumentData) => addDoc(collection(db, "calls"), data),
    {
      ...options,
      onSuccess: (data, ...args) => {
        queryClient.setQueryData(CALL_QUERY_KEY, data);
        return options?.onSuccess?.(data, ...args);
      },
    }
  );
}

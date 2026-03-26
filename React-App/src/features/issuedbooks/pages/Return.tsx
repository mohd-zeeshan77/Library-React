import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useReturnBookMutation } from "../queries";
import { Button } from "../../../shared/components/buttons";
import { useState, useEffect } from "react";

export default function ReturnPage() {
  const { bookId, userId } = useParams<{ bookId: string; userId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const returnMutation = useReturnBookMutation();

  // Initialize state from navigation state (passed from List.tsx)
  const state = location.state as { isReturned?: boolean } | undefined;
  const [isReturned, setIsReturned] = useState(state?.isReturned ?? false);

  // Redirect if missing info
  useEffect(() => {
    if (!bookId || !userId) {
      navigate("/issued");
    }
  }, [bookId, userId, navigate]);

  const handleToggle = async () => {
    if (!bookId || !userId) return;
    try {
      await returnMutation.mutateAsync({
        bookId: parseInt(bookId, 10),
        userId: parseInt(userId, 10),
        isReturned: !isReturned,
      });
      setIsReturned(!isReturned);
    } catch (err) {
      console.error("Error updating return status:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow border-yellow-900 text-yellow-900">
      <h2 className="text-2xl font-bold mb-4">CHANGE RETURN STATUS</h2>
      <p className="text-gray-800">
        Current Status:{" "}
        <strong className="text-gray-800">
          {isReturned ? "Returned" : "Not Returned"}
        </strong>
      </p>
      <div className="flex justify-between gap-6">
        <Button caption="Toggle Status" onClick={handleToggle} />
        <Button caption="Back to List" onClick={() => navigate("/issued")} />
      </div>
    </div>
  );
}

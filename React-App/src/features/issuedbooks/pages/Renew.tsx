import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useRenewBookMutation } from "../queries";
import { Button } from "../../../shared/components/buttons";
import { useState, useEffect } from "react";

export default function Renew() {
  const { bookId, userId } = useParams<{ bookId: string; userId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const renewMutation = useRenewBookMutation();

  const bookIdNum = bookId ? parseInt(bookId, 10) : null;
  const userIdNum = userId ? parseInt(userId, 10) : null;

  const state = location.state as { isRenewed?: boolean } | undefined;
  const [isRenewed, setIsRenewed] = useState(state?.isRenewed ?? false);

  useEffect(() => {
    if (!bookIdNum || !userIdNum) {
      alert("Missing book or user information.");
      navigate("/issued");
    }
  }, [bookIdNum, userIdNum, navigate]);

  const handleToggle = async () => {
    if (!bookIdNum || !userIdNum) return;
    try {
      await renewMutation.mutateAsync({
        bookId: bookIdNum,
        userId: userIdNum,
        renewStatus: !isRenewed,
      });
      setIsRenewed(!isRenewed);
    } catch (err) {
      console.error("Error updating renew status:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow border-yellow-900 text-yellow-900">
      <h2 className="text-2xl font-bold mb-4">CHANGE RENEW STATUS</h2>
      <p>
        Current Status: <strong>{isRenewed ? "Renewed" : "Not Renewed"}</strong>
      </p>
      <div className="flex justify-between gap-6">
        <Button caption="Toggle Status" onClick={handleToggle} />
        <Button caption="Back to List" onClick={() => navigate("/issued")} />
      </div>
    </div>
  );
}

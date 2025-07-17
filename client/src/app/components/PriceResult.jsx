import { usePriceStore } from '../../store/priceStore';

const PriceResult = () => {
  const { result } = usePriceStore();

  if (!result) return null;
  if (result.error) return <p className="text-red-500">{result.error}</p>;

  return (
    <div className="mt-4 p-4 border rounded bg-gray-100">
      <p><strong>Price:</strong> ${result.price}</p>
      <p><strong>Source:</strong> {result.source}</p>
    </div>
  );
};

export default PriceResult;

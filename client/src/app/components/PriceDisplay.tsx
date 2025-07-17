export default function PriceDisplay({ data }: { data: any }) {
  if (!data) return null;
  if (data.error) return <div className="text-red-600">❌ {data.error}</div>;

  return (
    <div className="mt-4 p-4 border bg-gray-100 rounded">
      💰 Price: <strong>${data.price}</strong> <br />
      🔍 Source: <em>{data.source}</em>
    </div>
  );
}

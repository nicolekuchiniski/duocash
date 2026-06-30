export function generateInstallments({
  title,
  amount,
  installments,
  startDate,
  card,
  category,
  tags = [],
}) {
  const installmentValue = amount / installments;

  return Array.from({ length: installments }, (_, index) => {
    const installmentNumber = index + 1;

    const date = new Date(startDate);
    date.setMonth(date.getMonth() + index);

    return {
      id: crypto.randomUUID(),
      type: "expense",
      title,
      category,
      paymentMethod: "credit",
      card,
      amount: installmentValue,
      date: date.toISOString().split("T")[0],
      installment: `${installmentNumber}/${installments}`,
      tags,
    };
  });
}
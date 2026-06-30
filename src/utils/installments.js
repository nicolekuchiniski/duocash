function createDate(year, month, day) {
  return new Date(year, month, day);
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getFirstBillDate(startDate, card) {
  const purchaseDate = new Date(startDate);

  const purchaseYear = purchaseDate.getFullYear();
  const purchaseMonth = purchaseDate.getMonth();
  const purchaseDay = purchaseDate.getDate();

  const isBeforeClosing = purchaseDay <= card.closingDay;

  if (isBeforeClosing) {
    return createDate(purchaseYear, purchaseMonth, card.dueDay);
  }

  return createDate(purchaseYear, purchaseMonth + 1, card.dueDay);
}

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
  const firstBillDate = getFirstBillDate(startDate, card);

  return Array.from({ length: installments }, (_, index) => {
    const installmentNumber = index + 1;

    const billDate = new Date(firstBillDate);
    billDate.setMonth(firstBillDate.getMonth() + index);

    return {
      id: crypto.randomUUID(),
      type: "expense",
      title,
      category,
      paymentMethod: "credit",
      card: card.name,
      amount: installmentValue,
      date: formatDate(billDate),
      installment: `${installmentNumber}/${installments}`,
      tags,
    };
  });
}
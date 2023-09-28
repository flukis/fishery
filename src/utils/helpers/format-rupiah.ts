function formatRupiah(number: number) {
  // Check if the input is a valid number
  if (isNaN(number)) {
    return "Invalid Input";
  }

  // Format the number with thousands separator and add "Rp" symbol
  const formattedNumber = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

  return formattedNumber;
}

export { formatRupiah };

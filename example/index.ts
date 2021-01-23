import invoicesData from "./data/invoices";
import playsData from "./data/plays";

import { Invoice, Plays, StatementData } from "./types";
import createStatementData from './createStatmentData';

function statement(invoice: Invoice, plays: Plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data: StatementData) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}

function main() {
  invoicesData.forEach((invoiceData) => {
    const result = statement(invoiceData, playsData);
    console.log(result);
  });
}

main();

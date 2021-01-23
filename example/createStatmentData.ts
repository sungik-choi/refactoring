import { Invoice, Plays, Performance, StatementData, PerformanceStatement, Play } from "./types";

class PerformanceCalculator {
  performance: Performance;
  play: Play;

  constructor(aPerformance: Performance, aPlay: Play) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    let result = 0;
    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    }
    return result;
  }
}

function createStatementData(invoice: Invoice, plays: Plays) {
  const statementData = <StatementData>{};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;

  function enrichPerformance(aPerformance: Performance) {
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = <PerformanceStatement>Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance: PerformanceStatement) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  }

  function volumeCreditsFor(aPerformance: PerformanceStatement) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function totalVolumeCredits(data: StatementData) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(data: StatementData) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}

export default createStatementData;

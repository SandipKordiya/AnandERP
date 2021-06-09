using System.Text;
using System.Threading.Tasks;
using Shop.API.Data;

namespace Shop.API.Helpers
{
    public class TemplateGenerator
    {
        private readonly IShopRepository _repo;

        public TemplateGenerator(IShopRepository repo)
        {
            _repo = repo;
        }
        public async Task<string> GetHTMLString()
        {
            // var employees = await _repo.GetProductLists();
            var sb = new StringBuilder();
            sb.Append(@"
                        <html>
                            <head>
                           <style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 1.36182;
}
body {
  margin: 0;
}
.font-bold-400 {
  font-weight: 400 !;
}
.font-bold-600 {
  font-weight: 600 !important;
}
p {
  margin-bottom: 5px;
}
.container {
  width: 99%;
  height: 99%;
  border: 2px solid black;
}

.main {
  width: 100%;
  height: 100%;
}
.top {
  display: table;
  width: 100%;
  background-color: #dee2e6;
  border-bottom: 2px solid black;
}
.top .col {
  display: table-cell;
  padding: 5px;
}
.top .col h4 {
  font-weight: 600;
  font-size: 17px;
}
.top .col:nth-child(1) {
  width: 50%;
}

.top .col:nth-child(2) {
  width: 50%;
  text-align: right;
}

.main-product {
  border-top: 2px solid black;

  width: 100%;
  min-height: 200px;
}

table {
  border-collapse: collapse;
  width: 100% !important;
  margin-bottom: 1rem;
  color: #212529;
}

.table-bordered {
  /* border: 1px solid #e5e9ec; */
}

th {
  border: 2px solid #d0d6db !important;
  padding: 3px !important;
  text-align: left;
  font-size: 14px;
}
td {
  border: 2px solid #d0d6db !important;
  padding: 3px !important;
  text-align: left;
  font-size: 14px;
}
td:first-child,
th:first-child {
  border-left: 0 !important;
  text-align: right;
}
td:last-child,
th:last-child {
  border-right: 0 !important;
}

tr:first-child th {
  border-top: 0 !important;
}

th {
  font-weight: bold;
}

thead {
  display: table-header-group;
}
tfoot {
  display: table-row-group;
}
tr {
  page-break-inside: avoid;
}
.table-25 {
  width: 25%;
}
.table-12 {
  width: 9%;
}

.col .title {
  font-size: 15px;
  font-weight: 600;
}

.col-container {
  display: table;
  width: 100%;
}
.col-container .col {
  display: table-cell;
}
.col-top {
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid grey;
  font-weight: 600;
  font-size: 15px;
}
.col-container .col:nth-child(1) {
  width: 40%;
  padding: 5px;
}
.col-container .col:nth-child(2) {
  width: 20%;
  text-align: center;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
}
.col-container .col:nth-child(3) {
  width: 40%;
  padding: 5px;
}

.main-footer {
  border-top: 1px solid grey;
  display: table;
  width: 99%;
  height: 110px;
  bottom: 2;
  position: absolute;
}
.main-footer .col {
  display: table-cell;
}
.main-footer .col:nth-child(1) {
  width: 70%;
  position: absolute;
  border-right: 1px solid grey;
}
.main-footer .col:nth-child(2) {
  width: 30%;
}
.amount-words {
  border: 1px solid grey;
  font-size: 15px;
  font-weight: bold;
  padding: 3px;
}
.extra {
  padding: 5px;
  font-size: x-small;
}

.extra p {
  margin-bottom: 2px;
}
.final td {
  text-align: right;
  padding-right: 5px !important;
}

                           </style>
                            </head>
                            <body>
                                <div class='header'><h1>This is the generated PDF report!!!</h1></div>
                                <table align='center'>
                                    <tr>
                                        <th>Name</th>
                                        <th>LastName</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                    </tr>");
            // foreach (var emp in employees)
            // {
            //     sb.AppendFormat(@"<tr>
            //                         <td>{0}</td>
            //                         <td>{1}</td>
            //                         <td>{2}</td>
            //                         <td>{3}</td>
            //                       </tr>", emp.Id, emp.ProductName, emp.MRP, emp.TaxName);
            // }
            sb.Append(@"
                                </table>
                            </body>
                        </html>");
            return sb.ToString();
        }

        public string GetInvoiceString(int id)
        {
            var Order = _repo.GetPurchaseOrderModelFromSP(id).Result;
            string amountInWords = CurrencyInWords.ConvertToWords(Order.NetAmount.ToString());
            var OrderItems = _repo.GetPurchaseOrderItemsModelsFromSP(id).Result;
            var sb = new StringBuilder();
            sb.Append(@"<html>
                            <head>
                            <style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 1.36182;
}
body {
  margin: 0;
}
.font-bold-400 {
  font-weight: 400 !;
}
.font-bold-600 {
  font-weight: 600 !important;
}
p {
  margin-bottom: 5px;
}
.container {
  width: 99%;
  height: 99%;
  border: 2px solid black;
}

.main {
  width: 100%;
  height: 100%;
}
.top {
  display: table;
  width: 100%;
  background-color: #dee2e6;
  border-bottom: 2px solid black;
}
.top .col {
  display: table-cell;
  padding: 5px;
}
.top .col h4 {
  font-weight: 600;
  font-size: 17px;
}
.top .col:nth-child(1) {
  width: 50%;
}

.top .col:nth-child(2) {
  width: 50%;
  text-align: right;
}

.main-product {
  border-top: 2px solid black;

  width: 100%;
  min-height: 200px;
}

table {
  border-collapse: collapse;
  width: 100% !important;
  margin-bottom: 1rem;
  color: #212529;
}

.table-bordered {
  /* border: 1px solid #e5e9ec; */
}

th {
  border: 2px solid #d0d6db !important;
  padding: 3px !important;
  text-align: left;
  font-size: 14px;
}
td {
  border: 2px solid #d0d6db !important;
  padding: 3px !important;
  text-align: left;
  font-size: 14px;
}
td:first-child,
th:first-child {
  border-left: 0 !important;
  text-align: right;
}
td:last-child,
th:last-child {
  border-right: 0 !important;
}

tr:first-child th {
  border-top: 0 !important;
}

th {
  font-weight: bold;
}

thead {
  display: table-header-group;
}
tfoot {
  display: table-row-group;
}
tr {
  page-break-inside: avoid;
}
.table-25 {
  width: 25%;
}
.table-12 {
  width: 9%;
}

.col .title {
  font-size: 15px;
  font-weight: 600;
}

.col-container {
  display: table;
  width: 100%;
}
.col-container .col {
  display: table-cell;
}
.col-top {
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid grey;
  font-weight: 600;
  font-size: 15px;
}
.col-container .col:nth-child(1) {
  width: 40%;
  padding: 5px;
}
.col-container .col:nth-child(2) {
  width: 20%;
  text-align: center;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
}
.col-container .col:nth-child(3) {
  width: 40%;
  padding: 5px;
}

.main-footer {
  border-top: 1px solid grey;
  display: table;
  width: 99%;
  height: 110px;
  bottom: 2;
  position: absolute;
}
.main-footer .col {
  display: table-cell;
}
.main-footer .col:nth-child(1) {
  width: 70%;
  position: absolute;
  border-right: 1px solid grey;
}
.main-footer .col:nth-child(2) {
  width: 30%;
}
.amount-words {
  border: 1px solid grey;
  font-size: 15px;
  font-weight: bold;
  padding: 3px;
}
.extra {
  padding: 5px;
  font-size: x-small;
}

.extra p {
  margin-bottom: 2px;
}
.final td {
  text-align: right;
  padding-right: 5px !important;
}

                           </style>
                            </head>
                            <body>
                                <div class='container'>
                                        <div class='top bd-highlight'>
                                            <div class='col'>
                                                <h4 class='font-bold-600'>SHREE LAXMI AYURVEDA</h4>
                                            </div>
                                            <div class='col'>
                                                TAX INVOICE
                                            </div>
                                        </div>
                                        <div class='col-container'>
                                            <div class='col'>
                                                <p>Arya Samaj Shopping Centre, Ishwar Petlikar Road, Nr.
                                                    N.K.Solanki Hall, Near Gopal Cinema Crossing, Anand -
                                                    388001</p>
                                                <p>Mob : 9825670866</p>
                                                <p>GSTIN : 24ADDFS4400N1Z4</p>
                                            </div>

                                            <div class='col'>
                                            <div class='col-top'>
                                                    <p>" + Order.InvoiceNo + @"</p>
                                                </div>
                                                <div>
                                                    <p>Inv Date
                                                        :" + Order.PurchaseDate.ToShortDateString() + @"</p>
                                                </div>
                                            </div>

                                            <div class='col'>
                                                <p class='title'>To, SHREEJI AYURVEDIC STORE</p>
                                                <p>14,SHANABHAI ASTATE ,AMUL DAIRY ROAD,NEAR
                                                    RAILWAY CROSSING,, Anand - 388001, GUJRAT, INDIA</p>
                                                <p>M:7016635154 / GST:24AESPP6926Q1ZG</p>
                                            </div>
                                        </div>     
                                        <div class='main-product'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Sr</th>
                                                        <th class='table-25'>Item</th>
                                                        <th class='table-12'>HSN</th>
                                                        <th class='table-12'>Batch</th>
                                                        <th>Exp</th>
                                                        <th>MRP</th>
                                                        <th>Qty</th>
                                                        <th>Rate</th>
                                                        <th>Dis.%</th>
                                                        <th>CGST</th>
                                                        <th>SGST</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>");
            foreach (var item in OrderItems)
            {
                sb.AppendFormat(@"<tr>
                                                                        <td>{0}</td>
                                                                        <td>{1}</td>
                                                                        <td>{2}</td>
                                                                        <td>{3}</td>
                                                                        <td>{4}</td>
                                                                        <td>{5}</td>
                                                                        <td>{6}</td>
                                                                        <td>{7}</td>
                                                                        <td>{8}</td>
                                                                        <td>{9}</td>
                                                                        <td>{10}</td>
                                                                        <td>{11}</td>
                                                                    </tr>", item.Id, item.ProductName, '-', item.BatchNo, item.ExpireDate?.ToShortDateString(),
                                item.MRP, item.Quantity, item.Rate, item.Discount, item.TaxRate, item.TaxRate, item.Amount);
            }
            sb.AppendFormat(@"
                            <tr>
                                <td></td>
                                <td><b>Total</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b>0.00</b></td>
                                <td><b>0.00</b></td>
                                <td><b>{0}", Order.NetAmount + @"</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class='main-footer'>
                    <div class='col'>
                        <div class='amount-words'>Amt In Words : Rupees " + amountInWords + @"</div>
                        <div class='extra'>
                            <p>Message: We wish for a quick recovery and a healthy life for everyone!! </p>
                            <p>Return Policy: Unopened items in original packaging with an original receipt within 10 days only.
                                We reserve the rights to revoke these exceptions any
                                time.</p>
                            <p>Bank: IndusInd Bank;A/C:257567080426;IFSC:INDB0000155</p>
                            <p>SUBJECT TO ANAND JURISDICTION ONLY</p>
                        </div>
                    </div>
                    <div class='col final'>
                        <table>
                            <tr>
                                <td>Other +/-</td>
                                <td>" + Order.Other + @"</td>
                            </tr>
                            <tr>
                                <td>Round Off</td>
                                <td>" + Order.RoundOff + @"</td>
                            </tr>
                            <tr>
                                <td>Net Amount</td>
                                <td>" + Order.NetAmount + @"</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            </body>
                                </html>");
            return  sb.ToString();
        }

        public async Task<string> GetSaleInvoiceString(int id)
        {
            var Order = await _repo.GetSaleOrderModelFromSP(id);
            string amountInWords = CurrencyInWords.ConvertToWords(Order.NetAmount.ToString());
            var OrderItems = await _repo.GetSaleOrderItemsModelsFromSP(id);
            var sb = new StringBuilder();
            if (Order != null)
            {
                sb.Append(@"<html>
                            <head>
                            <style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 1.36182;
}
body {
  margin: 0;
}
.font-bold-400 {
  font-weight: 400 !;
}
.font-bold-600 {
  font-weight: 600 !important;
}
p {
  margin-bottom: 5px;
}
.container {
  width: 99%;
  height: 99%;
  border: 2px solid black;
}

.main {
  width: 100%;
  height: 100%;
}
.top {
  display: table;
  width: 100%;
  background-color: #dee2e6;
  border-bottom: 2px solid black;
}
.top .col {
  display: table-cell;
  padding: 5px;
}
.top .col h4 {
  font-weight: 600;
  font-size: 17px;
}
.top .col:nth-child(1) {
  width: 50%;
}

.top .col:nth-child(2) {
  width: 50%;
  text-align: right;
}

.main-product {
  border-top: 2px solid black;

  width: 100%;
  min-height: 200px;
}

table {
  border-collapse: collapse;
  width: 100% !important;
  margin-bottom: 1rem;
  color: #212529;
}

.table-bordered {
  /* border: 1px solid #e5e9ec; */
}

th {
  border: 2px solid #d0d6db !important;
  padding: 3px !important;
  text-align: left;
  font-size: 14px;
}
td {
  border: 2px solid #d0d6db !important;
  padding: 3px !important;
  text-align: left;
  font-size: 14px;
}
td:first-child,
th:first-child {
  border-left: 0 !important;
  text-align: right;
}
td:last-child,
th:last-child {
  border-right: 0 !important;
}

tr:first-child th {
  border-top: 0 !important;
}

th {
  font-weight: bold;
}

thead {
  display: table-header-group;
}
tfoot {
  display: table-row-group;
}
tr {
  page-break-inside: avoid;
}
.table-25 {
  width: 25%;
}
.table-12 {
  width: 9%;
}

.col .title {
  font-size: 15px;
  font-weight: 600;
}

.col-container {
  display: table;
  width: 100%;
}
.col-container .col {
  display: table-cell;
}
.col-top {
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid grey;
  font-weight: 600;
  font-size: 15px;
}
.col-container .col:nth-child(1) {
  width: 40%;
  padding: 5px;
}
.col-container .col:nth-child(2) {
  width: 20%;
  text-align: center;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
}
.col-container .col:nth-child(3) {
  width: 40%;
  padding: 5px;
}

.main-footer {
  border-top: 1px solid grey;
  display: table;
  width: 99%;
  height: 110px;
  bottom: 2;
  position: absolute;
}
.main-footer .col {
  display: table-cell;
}
.main-footer .col:nth-child(1) {
  width: 70%;
  position: absolute;
  border-right: 1px solid grey;
}
.main-footer .col:nth-child(2) {
  width: 30%;
}
.amount-words {
  border: 1px solid grey;
  font-size: 15px;
  font-weight: bold;
  padding: 3px;
}
.extra {
  padding: 5px;
  font-size: x-small;
}

.extra p {
  margin-bottom: 2px;
}
.final td {
  text-align: right;
  padding-right: 5px !important;
}

                           </style>
                            </head>
                            <body>
                                <div class='container'>
                                        <div class='top bd-highlight'>
                                            <div class='col'>
                                                <h4 class='font-bold-600'>SHREE LAXMI AYURVEDA</h4>
                                            </div>
                                            <div class='col'>
                                                TAX INVOICE
                                            </div>
                                        </div>
                                        <div class='col-container'>
                                            <div class='col'>
                                                <p>Arya Samaj Shopping Centre, Ishwar Petlikar Road, Nr.
                                                    N.K.Solanki Hall, Near Gopal Cinema Crossing, Anand -
                                                    388001</p>
                                                <p>Mob : 9825670866</p>
                                                <p>GSTIN : 24ADDFS4400N1Z4</p>
                                            </div>

                                            <div class='col'>
                                            <div class='col-top'>
                                                    <p>" + Order.InvoiceNo + @"</p>
                                                </div>
                                                <div>
                                                    <p>Inv Date
                                                        :" + Order.SaleDate.ToShortDateString() + @"</p>
                                                </div>
                                            </div>

                                            <div class='col'>
                                                <p class='title'>To, SHREEJI AYURVEDIC STORE</p>
                                                <p>14,SHANABHAI ASTATE ,AMUL DAIRY ROAD,NEAR
                                                    RAILWAY CROSSING,, Anand - 388001, GUJRAT, INDIA</p>
                                                <p>M:7016635154 / GST:24AESPP6926Q1ZG</p>
                                            </div>
                                        </div>     
                                        <div class='main-product'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Sr</th>
                                                        <th class='table-25'>Item</th>
                                                        <th class='table-12'>HSN</th>
                                                        <th class='table-12'>Batch</th>
                                                        <th>Exp</th>
                                                        <th>MRP</th>
                                                        <th>Qty</th>
                                                        <th>Rate</th>
                                                        <th>Dis.%</th>
                                                        <th>CGST</th>
                                                        <th>SGST</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>");
                foreach (var item in OrderItems)
                {
                    sb.AppendFormat(@"<tr>
                                                                        <td>{0}</td>
                                                                        <td>{1}</td>
                                                                        <td>{2}</td>
                                                                        <td>{3}</td>
                                                                        <td>{4}</td>
                                                                        <td>{5}</td>
                                                                        <td>{6}</td>
                                                                        <td>{7}</td>
                                                                        <td>{8}</td>
                                                                        <td>{9}</td>
                                                                        <td>{10}</td>
                                                                        <td>{11}</td>
                                                                    </tr>", item.Id, item.ProductName, '-', item.BatchNo, item.ExpireDate.ToShortDateString(),
                                    item.MRP, item.Quantity, item.Rate, item.Discount, item.TaxRate, item.TaxRate, item.Amount);
                }
                sb.AppendFormat(@"
                            <tr>
                                <td></td>
                                <td><b>Total</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><b>0.00</b></td>
                                <td><b>0.00</b></td>
                                <td><b>{0}", Order.NetAmount + @"</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class='main-footer'>
                    <div class='col'>
                        <div class='amount-words'>Amt In Words : Rupees " + amountInWords + @"</div>
                        <div class='extra'>
                            <p>Message: We wish for a quick recovery and a healthy life for everyone!! </p>
                            <p>Return Policy: Unopened items in original packaging with an original receipt within 10 days only.
                                We reserve the rights to revoke these exceptions any
                                time.</p>
                            <p>Bank: IndusInd Bank;A/C:257567080426;IFSC:INDB0000155</p>
                            <p>SUBJECT TO ANAND JURISDICTION ONLY</p>
                        </div>
                    </div>
                    <div class='col final'>
                        <table>
                            <tr>
                                <td>Other +/-</td>
                                <td>" + Order.Other + @"</td>
                            </tr>
                            <tr>
                                <td>Round Off</td>
                                <td>" + Order.RoundOff + @"</td>
                            </tr>
                            <tr>
                                <td>Net Amount</td>
                                <td>" + Order.NetAmount + @"</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            </body>
                                </html>");
            }

            return sb.ToString();
        }
    }
}
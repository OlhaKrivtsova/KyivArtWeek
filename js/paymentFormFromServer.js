const htmlForm = `
<div class="server-html">
<form class="server-html__description-form">
  <div class="server-html__order-group">
    <label for="payment-order" class="server-html__order-label"
      >Замовлення</label
    >
    <input
      id="payment-order"
      readonly
      type="text"
      class="server-html__order-input"
      value="503394009"
    />
  </div>

  <div class="server-html__description">
    Ви замовили квітки на 28/08/23 у кількості 2 шт.
  </div>
  <div class="server-html__cost-group">
    <label for="payment-cost" class="server-html__cost-label"
      >До сплати:</label
    >
    <div class="server-htm__cost">
      <input
        id="payment-cost"
        readonly
        type="text"
        class="server-html__cost-input"
        value="450.00"
      />
      UAH
    </div>
  </div>
</form>
<form
  onsubmit="return false"
  method="POST"
  action="https://www.liqpay.ua/api/3/checkout"
  accept-charset="utf-8"
>
  <input
    type="hidden"
    name="data"
    value="eyJwdWJsaWNfa2V5IjoiaTAwMDAwMDAwIiwidmVyc2lvbiI6IjMiLCJhY3Rpb24iOiJwYXkiLCJhbW91bnQiOiIzIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6InRlc3QiLCJvcmRlcl9pZCI6IjAwMDAwMSJ9"
  />
  <input
    type="hidden"
    name="signature"
    value="wR+UZDC4jjeL/qUOvIsofIWpZh8="
  />
  <button
    type="submit"
    class="server-html__btn btn-buy-ticket"
  >Сплатити
  </button>
</form>
</div>
`;
export default htmlForm;

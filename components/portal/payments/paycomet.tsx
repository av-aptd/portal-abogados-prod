import React from "react";

const PayCometForm = () => {
  return (
    <div className="p-8">
      PayCometForm
      <div className="container">
        <div className="card-body p-5">
          <form
            role="form"
            id="paycometPaymentForm"
            action="index.php"
            method="POST"
          >
            <input type="hidden" name="amount" value="1234" />
            <input
              type="hidden"
              data-paycomet="jetID"
              value="[customer-jetID]"
            />
            <div className="form-group">
              <label>Full name (on the card)</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  data-paycomet="cardHolderName"
                  placeholder=""
                />
              </div>
            </div>

            <div className="form-group">
              <label>Card number</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-credit-card"></i>
                  </span>
                </div>
                <div id="paycomet-pan"></div>
                <input
                  paycomet-style="width: 100%; height: 21px; font-size:14px; padding-left:7px; padding-top:8px; border:0px;"
                  paycomet-name="pan"
                  paycomet-placeholder="Introduce tu tarjeta..."
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-8">
                <div className="form-group">
                  <label>
                    <span className="hidden-xs">Expiration</span>{" "}
                  </label>
                  <div className="form-inline">
                    <select className="form-control" data-paycomet="dateMonth">
                      <option>MM</option>
                      <option value="01">01 - January</option>
                      <option value="02">02 - February</option>
                      <option value="03">03 - March</option>
                      <option value="04">04 - April</option>
                      <option value="05">05 - May</option>
                      <option value="06">06 - June</option>
                      <option value="07">07 - July</option>
                      <option value="08">08 - August</option>
                      <option value="09">09 - September</option>
                      <option value="10">10 - October</option>
                      <option value="11">11 - November</option>
                      <option value="12">12 - December</option>
                    </select>
                    <span> / </span>
                    <select className="form-control" data-paycomet="dateYear">
                      <option>YY</option>
                      <option value="20">2020</option>
                      <option value="21">2021</option>
                      <option value="22">2022</option>
                      <option value="23">2023</option>
                      <option value="24">2024</option>
                      <option value="25">2025</option>
                      <option value="26">2026</option>
                      <option value="27">2027</option>
                      <option value="28">2028</option>
                      <option value="29">2029</option>
                      <option value="30">2030</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="form-group">
                  <label
                    data-toggle="tooltip"
                    title=""
                    data-original-title="3 digits code on back side of the card"
                  >
                    CVV <i className="fa fa-question-circle"></i>
                  </label>
                  <div id="paycomet-cvc2"></div>
                  <input
                    paycomet-name="cvc2"
                    paycomet-style="border:0px; width: 100%; height: 21px; font-size:12px; padding-left:7px; padding-tap:8px;"
                    paycomet-placeholder="CVV2"
                    className="form-control"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <button
              className="subscribe btn btn-primary btn-block"
              type="submit"
            >
              {" "}
              Confirm{" "}
            </button>
          </form>
          <div id="paymentErrorMsg"></div>
        </div>
      </div>
    </div>
  );
};

export default PayCometForm;

import React from "react";

const PartnershipRevenue = () => {
  const originalText = "Export of goods and services";
  const truncatedText = originalText.substring(0, 15);
  return (
    <div className="row mt-4">
      <div className="col-lg-11">
        <div className="table-container-bg">
          <div className="table-content overflow-x-auto">
            <div className="table-inner">
              <div class="table-headings table-row ">
                <div class="table-heading-item table-col-A">Indicator name</div>
                <div class="table-heading-item table-col-B">Data type</div>
                <div class="table-heading-item table-col-B">Rolwe</div>
                <div class="table-heading-item table-col-B">Gentd. Amt (N)</div>
                <div class="table-heading-item table-col-B">
                  Partnership type
                </div>
                <div class="table-heading-item table-col-B">Partner name</div>
                <div class="table-heading-item table-col-B">
                  % of final amount
                </div>
                <div class="table-heading-item table-col-B">Txn ID</div>
              </div>
              <div className="table-body-container">
                <div className="item-with-dropdown">
                  <div class="table-body table-row">
                    <div class="table-body-items table-col-A">
                      {truncatedText}...
                    </div>
                    <div class="table-body-items table-col-B">Data</div>
                    <div class="table-body-items table-col-B">Contributor</div>
                    <div class="table-body-items table-col-B">3,500.00</div>
                    <div class="table-body-items table-col-B">Contributor</div>
                    <div class="table-body-items table-col-B">
                      University of Ilorin
                    </div>
                    <div class="table-body-items table-col-B">25%</div>
                    <div class="table-body-items table-col-B">ADF231SFAD</div>
                  </div>
                  <div className="dropdown-revenue">
                    <div className=" row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6 dropdown-card">
                        <div className="row dropdown-inner-head table-headings table-row">
                          <div className="col-7 table-heading-item ">Partner name</div>
                          <div className="col-5 table-heading-item">Revenue Allocated (IN)</div>
                        </div>
                        <div>
                        <div className="row dropdown-inner-body table-body">
                          <div className="col-7 table-body-items">Mr. Ajanlekoko Arowolo</div>
                          <div className="col-5 table-body-items">3,500.00</div>
                        </div>
                        <div className="row dropdown-inner-body table-body">
                          <div className="col-7 table-body-items">Mr. Ajanlekoko Arowolo</div>
                          <div className="col-5 table-body-items">3,500.00</div>
                        </div>
                        <div className="row dropdown-inner-body table-body">
                          <div className="col-7 table-body-items">Mr. Ajanlekoko Arowolo</div>
                          <div className="col-5 table-body-items">3,500.00</div>
                        </div>
                        <div className="row dropdown-inner-body table-body">
                          <div className="col-7 table-body-items">Mr. Ajanlekoko Arowolo</div>
                          <div className="col-5 table-body-items">3,500.00</div>
                        </div>
                        <div className="row dropdown-inner-body table-body">
                          <div className="col-7 table-body-items">Mr. Ajanlekoko Arowolo</div>
                          <div className="col-5 table-body-items">3,500.00</div>
                        </div>
                        </div>
                      </div>
                      <div className="col-lg-3"></div>
                    </div>
                  </div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-A">
                    {truncatedText}...
                  </div>
                  <div class="table-body-items table-col-B">
                    Article/Write-Up
                  </div>
                  <div class="table-body-items table-col-B">Co-author</div>
                  <div class="table-body-items table-col-B">3,500.00</div>
                  <div class="table-body-items table-col-B">Co-author</div>
                  <div class="table-body-items table-col-B">
                    University of Ilorin
                  </div>
                  <div class="table-body-items table-col-B">25%</div>
                  <div class="table-body-items table-col-B">ADF231SFAD</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-A">
                    {truncatedText}...
                  </div>
                  <div class="table-body-items table-col-B">Data</div>
                  <div class="table-body-items table-col-B">Contributor</div>
                  <div class="table-body-items table-col-B">3,500.00</div>
                  <div class="table-body-items table-col-B">Contributor</div>
                  <div class="table-body-items table-col-B">
                    University of Ilorin
                  </div>
                  <div class="table-body-items table-col-B">25%</div>
                  <div class="table-body-items table-col-B">ADF231SFAD</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-A">
                    {truncatedText}...
                  </div>
                  <div class="table-body-items table-col-B">
                    Article/Write-Up
                  </div>
                  <div class="table-body-items table-col-B">Co-author</div>
                  <div class="table-body-items table-col-B">3,500.00</div>
                  <div class="table-body-items table-col-B">Co-author</div>
                  <div class="table-body-items table-col-B">
                    University of Ilorin
                  </div>
                  <div class="table-body-items table-col-B">25%</div>
                  <div class="table-body-items table-col-B">ADF231SFAD</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-A">
                    {truncatedText}...
                  </div>
                  <div class="table-body-items table-col-B">Data</div>
                  <div class="table-body-items table-col-B">Contributor</div>
                  <div class="table-body-items table-col-B">3,500.00</div>
                  <div class="table-body-items table-col-B">Contributor</div>
                  <div class="table-body-items table-col-B">
                    University of Ilorin
                  </div>
                  <div class="table-body-items table-col-B">25%</div>
                  <div class="table-body-items table-col-B">ADF231SFAD</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-A">
                    {truncatedText}...
                  </div>
                  <div class="table-body-items table-col-B">
                    Article/Write-Up
                  </div>
                  <div class="table-body-items table-col-B">Co-author</div>
                  <div class="table-body-items table-col-B">3,500.00</div>
                  <div class="table-body-items table-col-B">Co-author</div>
                  <div class="table-body-items table-col-B">
                    University of Ilorin
                  </div>
                  <div class="table-body-items table-col-B">25%</div>
                  <div class="table-body-items table-col-B">ADF231SFAD</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-A">
                    {truncatedText}...
                  </div>
                  <div class="table-body-items table-col-B">Data</div>
                  <div class="table-body-items table-col-B">Contributor</div>
                  <div class="table-body-items table-col-B">3,500.00</div>
                  <div class="table-body-items table-col-B">Contributor</div>
                  <div class="table-body-items table-col-B">
                    University of Ilorin
                  </div>
                  <div class="table-body-items table-col-B">25%</div>
                  <div class="table-body-items table-col-B">ADF231SFAD</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-A">
                    {truncatedText}...
                  </div>
                  <div class="table-body-items table-col-B">
                    Article/Write-Up
                  </div>
                  <div class="table-body-items table-col-B">Co-author</div>
                  <div class="table-body-items table-col-B">3,500.00</div>
                  <div class="table-body-items table-col-B">Co-author</div>
                  <div class="table-body-items table-col-B">
                    University of Ilorin
                  </div>
                  <div class="table-body-items table-col-B">25%</div>
                  <div class="table-body-items table-col-B">ADF231SFAD</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-A">
                    {truncatedText}...
                  </div>
                  <div class="table-body-items table-col-B">Data</div>
                  <div class="table-body-items table-col-B">Contributor</div>
                  <div class="table-body-items table-col-B">3,500.00</div>
                  <div class="table-body-items table-col-B">Contributor</div>
                  <div class="table-body-items table-col-B">
                    University of Ilorin
                  </div>
                  <div class="table-body-items table-col-B">25%</div>
                  <div class="table-body-items table-col-B">ADF231SFAD</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-A">
                    {truncatedText}...
                  </div>
                  <div class="table-body-items table-col-B">
                    Article/Write-Up
                  </div>
                  <div class="table-body-items table-col-B">Co-author</div>
                  <div class="table-body-items table-col-B">3,500.00</div>
                  <div class="table-body-items table-col-B">Co-author</div>
                  <div class="table-body-items table-col-B">
                    University of Ilorin
                  </div>
                  <div class="table-body-items table-col-B">25%</div>
                  <div class="table-body-items table-col-B">ADF231SFAD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipRevenue;

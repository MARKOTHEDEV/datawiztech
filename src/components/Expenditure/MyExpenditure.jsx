import React from "react";

const MyExpenditure = ({myExpenditure}) => {
  return (
  <div className="row mt-4">
      <div className="col-lg-10">
        <div className="table-container-bg">
          <div className="table-content overflow-x-auto">
            <div className={`${myExpenditure?"table-my-revenue":"table-inner"}`}>
              <div class="table-headings table-row">
                <div class="table-heading-item table-col-4">Indicator name</div>
                <div class="table-heading-item table-col-3">Data type</div>
                <div class="table-heading-item table-col-2">Role</div>
                <div class="table-heading-item table-col-3">My revenue (N)</div>
              </div>
              <div className="table-body-container">
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                    Export of goods and services
                  </div>
                  <div class="table-body-items table-col-3">Data</div>
                  <div class="table-body-items table-col-2">Contributor</div>
                  <div class="table-body-items table-col-3">3,500.00</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                    Export of goods and services
                  </div>
                  <div class="table-body-items table-col-3">Article/Write-Up</div>
                  <div class="table-body-items table-col-2">Co-author</div>
                  <div class="table-body-items table-col-3">3,500.00</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                    Export of goods and services
                  </div>
                  <div class="table-body-items table-col-3">Data</div>
                  <div class="table-body-items table-col-2">Contributor</div>
                  <div class="table-body-items table-col-3">3,500.00</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                    Export of goods and services
                  </div>
                  <div class="table-body-items table-col-3">Article/Write-Up</div>
                  <div class="table-body-items table-col-2">Co-author</div>
                  <div class="table-body-items table-col-3">3,500.00</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                    Export of goods and services
                  </div>
                  <div class="table-body-items table-col-3">Data</div>
                  <div class="table-body-items table-col-2">Contributor</div>
                  <div class="table-body-items table-col-3">3,500.00</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                    Export of goods and services
                  </div>
                  <div class="table-body-items table-col-3">Article/Write-Up</div>
                  <div class="table-body-items table-col-2">Co-author</div>
                  <div class="table-body-items table-col-3">3,500.00</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                    Export of goods and services
                  </div>
                  <div class="table-body-items table-col-3">Data</div>
                  <div class="table-body-items table-col-2">Contributor</div>
                  <div class="table-body-items table-col-3">3,500.00</div>
                </div>
                <div class="table-body table-row">
                  <div class="table-body-items table-col-4">
                    Export of goods and services
                  </div>
                  <div class="table-body-items table-col-3">Article/Write-Up</div>
                  <div class="table-body-items table-col-2">Co-author</div>
                  <div class="table-body-items table-col-3">3,500.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default MyExpenditure

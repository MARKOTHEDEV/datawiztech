{/* <Route element={<ProtectedRoute />}> */}
<Route
exact
path="/cart"
element={
  <ProtectedRoute>
    <Cart />
  </ProtectedRoute>
}
/>
<Route
exact
path="/profile"
element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
}
/>
<Route
exact
path="/profile/messages"
element={
  <ProtectedRoute>
    <Messages />
  </ProtectedRoute>
}
/>
<Route exact path="/profile/notifications" element={<Notification />} />
<Route exact path="/profile/revenue" element={<Revenue />} />
<Route exact path="/profile/expenditure" element={<Expenditure />} />
<Route
exact
path="/profile/verify-account"
element={<AccountVerification />}
/>
<Route exact path="/upload/edit-article" element={<EditArticle />} />
<Route
exact
path="/upload/upload-article"
element={<UploadArticle />}
/>
<Route
exact
path="/upload"
element={
  <ProtectedRoute>
    <Upload />
  </ProtectedRoute>
}
/>
<Route exact path="/upload/upload-data" element={<UploadData />} />
<Route
exact
path="/upload/upload-data/table"
element={<UploadDataTable />}
/>
<Route exact path="/partnership" element={<Partnership />} />
<Route
exact
path="/partnership/add-partnership"
element={<NewPartnership />}
/>
{/* </Route> */}
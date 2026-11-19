// Dish photos for the pitch demo, hotlinked from the restaurant's public Google Maps listing
// (collected 2026-11-19). Nothing is copied into this repo.
//
//  by: "owner"    – posted by the business account "Thịnh An Kitchen & Tofu" (studio shots)
//  by: "customer" – posted by Google Maps reviewers; matched to a menu item by how the dish looks
//
// These photos belong to the restaurant or to the people who posted them. Before any public launch,
// replace them with photos the owner provides or approves. Items without an entry keep their illustration,
// and an image that fails to load falls back to the illustration too.

export type DishPhoto = { url: string; by: "owner" | "customer" };

export const PHOTOS: Record<string, DishPhoto> = {
  "20-pho-ga": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QDtj39COm5j42akMIjbuhDlZSZJ0WLWDSFkB-zGAFIR8bDpO7ed-iUm3V-ta8tGVkMHGBDRtlzPMktbiOGqYjbcNehDzWMSLnb9IjEIuplMpbwsIQafY7j6v1Ajni-WKdlh9OAjw", by: "owner" },
  "4-goi-cuon": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9ReIsWdApaf4LNVL_Y0ZeSfSDctkcGM7qwUc4cTheRvWXEhpsDBpPJuccM6_U9If0njLpSJHQfNKAjvKKKlzYQx-d9iyp8eeL5-5Zop2LFAON6LRFUGRc4gokEvIe5a4mHMv4LD", by: "owner" },
  "132-banh-mi-dac-biet": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SygM7Hoj4s2c8Y8hCCErCf94Es-HIeoRo7EHIY5NxWIYCUPwaaLv09Ob9LYkr_1ASo_CYnGxQW9yuhYGsuYpT1OesO0ywlMB0o_GmUnIVUu6Bl5aAQGQLGBwvl2qjDWRo7-wdFAw", by: "owner" },
  "49-bun-thit-nuong": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T7Oseg_IqXUHn9FQBKL1Znm0yt8G62rJgeC1nLhDJLbV2hp8B74YcD--f0FFs77M7DxrnRLdbk-qwVs8rOyRXa7JC9phAT9eRHOh7GYI_j9Z0JpaD1PMwi8dD-_1iz7tQ8xng", by: "owner" },
  "1-cha-gio-heo": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Q70fvBJ8IcH9B0OGRnuwKFzoifwl1dwx21tBzHgSeOFpqR-lY9CDLogVREvJwDhrLagWEluVD8T63p9mNEOIvEegxxmUuq5VAMKL0jf3lEoLjmYrpDPnfsFAjIAJ9jEiyF_DmE", by: "owner" },
  "mango-sm": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RRvMdn4wRMHEMeB5LsBQ1zN1EOh9PoEZBtZu_nBCLrQ9varcPQJHDu69NPNbpndMoBtfVwzHW-_RjZ0UFuFHY6iWLE8xLglMXwI_XW3CGabi4HQcHu8nPqxsK1p5aiR1kSwCqa", by: "owner" },
  "72-banh-mi-bo-kho": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QqeRcLCxZIpeNrMaS2j96w7l7feePHfcWHGJC2pQqvw_SU4geMNufZ0BmbKVRDbjcmF-W3-WsVxXOBlmxO1QUCQZqyzTjMAhDdKBSRXTDRJm97GGFwocY3D9uzNYasfudctXaW", by: "owner" },
  "bo-kho": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RawloWaeaOjong0fS6n2wV1RuLblC2Vi-2uNf3L5RZ4f9mTWm7kID3KcjG8CbrnkB-xxal9IT8r17dTXPT1jCuPLS_OEN89rFLegZxwgV8dsCKpArPnZVnGi2OIoFkAH--jK0", by: "owner" },
  "87-com-tam": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RbFuv7KsfFUlWzDrAkvVz7iLS8Bl_JSLUdoYFRRhIzpQzJefFAFYD7dcyZc7gijiY-ucT6bu33UxCjYRHmLYnPQHfT2Ulc1kPIYiEKPLlXSnGIDREOlae9h0P9IATZvJ8DEFywQw", by: "owner" },
  "38-bun-bo-hue": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T95tJFjikhM2aGGtzaYEsHxlOtQow-1At24g9LuuVj6ZPvY-lkSOkNiSQ5G9FOcTk98iA92EBCkLxHF2vB_YoYMqA6xoaLDmWznufLjYkQh4VB8msxATdFJW5idC4lxGxmO2-HhA", by: "owner" },
  "88-com-suon-bo": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9ShJmezjCSIh8nCBcT_AbEsZti4gUbWVFW33IV5MhVICZyfUMqtQVNkFN4tCXU4psfqR62s1gOWLoEzz4mVHp87KB5nUmwBSNvLOZEWy1fmUBQ0hnTrCVuJopbxrQ-IuNept2xi", by: "owner" },
  "92-com-chien-duong-chau": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QpSUjbctxGvZsUAuju9eyRt4L8dI5amiKAe_454ERVeCg7JdBEZSDhv7G5HEZx_ORpqoLQk5z9y3O8LkF33rwJ_eJwKx9mtnBm3fH1_JOAUdcDNUrMQDBdgvzskjrOZ2jfcaauNw", by: "owner" },
  "5-goi-cuon-tom": { url: "https://lh3.googleusercontent.com/grass-cs/AABkmLf6yxhxCe3-SjaIJMQljIERn_MSwYj0u70DLp-kebVlq0nVAA4btdBALHQhIB0BUf-yN1IgjuBYW-z7Hi8TJryJQM_gNYYmGy1bK5b_I5tAlXw6hpfFDB84dzepnc77elHmfqVOGQ", by: "owner" },
  "18-pho-tai": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TxsqM7QMoEb2cS_xQlonljChTZnGShdkK8wJhPSVsyb8hGgRsV4pcHL7_oLyK32bCAh1F94f0dLgwpyKOlbJU_W81HvaVQ5iBDrVVzwQMiNTL1sfWtMAj0HM5HwJ4cl4oKSF15luVdDEJn", by: "customer" },
  "17-pho-dac-biet": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SZC4jKMy8wEVFqbrrDY07mMcKYMt7Of023RXdj6qRVN7nhAJ2ZyLd5STr4HFKteLaY2Ip7it2Xe48vqaVtwgPhAFHao-Zp4alisg95sat53KCUiZvl3QEy4PnclmViEcWiskX2s_t1Lpa_", by: "customer" },
  "122-pho-chay": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9S1AY8xcvltte1d-spgDt9no0DfXW2T8SME17rrVFa6kvnpo7-jKRFw7ulSozwr3Mw4pSzjhgwTggkhLwzjumshM2wRcmLqQ6qMbKa0mkBC1sRjhjuIuVKDBzC9TZxkOacF9lqt", by: "customer" },
  "41-bun-rieu-cua": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RhtU0a1oAWdPuElu9i_8WofaDOIkDu3L7IRKrHIP5xiWd7hD2hDtSXcT3kwjKtsEmobefVH8NmEwGORvkUe452NWJ87iVfSqbISDdcNF_zloWdXoz2TP-GySRRZhOzCQHDklk", by: "customer" },
  "60-banh-xeo": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Sp7LlC6w1pi3Kq4zO5kZGeUgM4pZ_MyhejH_0aTw9gEWauy3u1X8vgDTHNBwRvSbI4DwBJOkvQfQmX3OuMvnziHV-G3CPu9uk7febOFHiEyNnxJIatJoqNbPVhdX2gcl80OgVWOD5JvFxV", by: "customer" },
  "thai-tea-mt": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TTlEGieA8taYwu6UX_WFRDHQ5Om61xq5TUBJ1WteDnhjmpIrygzWeGUezcg67NMjxNN-fLtWcGZq-HF2PPmj7l1VktnuEYeOO7UKMN7qV7HceOq9ROvNJC8u5blCunMsMsB64", by: "customer" },
  "che-3-mau": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SiDELJVe_kClCn3Ynq5faG4XLdFLxDe7OG-4XXGlQNAVOYNsNhGmv8XsKbLk4XMQKefndkJhv7VYq37FtcTQpDYMGQ07k-ZHKtcNvj-IphZQe3Z_pd048eNkeHvmnxwDXTTgcL", by: "customer" },
  "53-bun-bo-xao-sa": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9ShjJ_xVRzPdCh_JbWoaQggevY2Oh9U3CbHTUo7gUUDMW9XTCTbA218blSRbvS_h82sq_b-naI1XOZRWV9Bnf9O4ykmVDC5HOKtNCfsnBdb8xRo0kAQIHthlruxnauqMhU03P6_", by: "customer" },
  "127-bun-chay": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Rdp0W-VKk9SkIZ_vO14lyuCScLOUfZ9Q9XgdsBbmg2wQXPVgqFFwIvtViSnNlpBDRtvb1eaohNu4Ws06oMddCSlVFnZCd7wQidsEo6gXotHin2IbkVFU6rU9w1KldMG9FmU-c", by: "customer" },
  "141-banh-mi-ga-nuong": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Swfr_1SotZlsq2dO0pSfd_cxxqrf_EbEr9QLqgrKHh_gLIfLEwFQ-CwTPR7Yo9y3DHNjpzZL8d9v9bEarHdsSbgc8rDo9v3RWblviPue7Zg8txTbgI0KxNkNQURjxZalE6hdMRvw", by: "customer" },
  "131-banh-mi-chay": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SVk2eK4zr-oz0wFCT-WY5N8kW5y6IjcTv_Yo26nLwa4S7xYpl5pzaiNXQxAT0tC0DRXboqLAXaKoedj1wDwEipQj4KROxUdoaZBIKoZjM20sjpywkYzuZuqHWuJKOIbkerdumOVQRkghci", by: "customer" },
  "121-goi-cuon-chay": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Qy-W2b-88eH4_7Z7QwF7fYCMmX7Deu03s5ahQYPiXT7_kQiDmST7Af70Nln4vJhyz4BPRFapVVwcgn9aTZCD-QKRYDAnEhunR_S22wtoAo9PX8fr5SJB8AZcimDh4p0pRbNDbIfQ5LD4Yr", by: "customer" },
  "125-mi-xao-chay": { url: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SRHZ-XRyARqa0osJFlIZozenzK5TCsFM2LGnep_kqWer6ScXYtr5oXTeRB3_ROTJpPiDTTepmh3YiGMA7ZMZIU_5abOXo5tFoXOGmAJPjMgR5gptsCM_GJpFGBeWUMqaT6kP2R", by: "customer" },
};

export const PLACE_PHOTOS = {
  storefront: "https://lh3.googleusercontent.com/grass-cs/AABkmLdvbjPecABuaZA4ol2v7zR6AqhmSI9ZLjvCkoJYUEbctL1D6ALw434J_xdZBXMwVaY7uZPSdHFK29Nl_SjaEL3ObBHscNq5gwj3kAYE8RssITfd1B1eEMmR-7GIgMBqoXPt8N4L",
  deli: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9T_PVG5M7T7e1Zwv6BcD0Gj7sLHzAOWslR87TjJK3fZXIUl5c4me03rqTxlHjUbLbhNWoOZQt_6Ci0Cy262awqlR932ZDH_G-JLfp9IXkDFS7dCzKWJcoTBo9chKwsQUuP31bueNg",
  dining: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SEfNT-gGkNLhUlDxPSNjDN3u_MHAVVV_BmV4thl4vz3_qMc-l4AnJlt7e_MfDsyVqDGyuW7w-M5h_yW1yu0pJyQQnNJKbfpRHm8qxPweziTQA8LPSryvGqj2wnjlMWlue50lM",
  tofu: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SL3xGmlM-suAKDpqn_Vb_Vl3acvYryVZh0SweCMQHulymRHdmV8xZFCnhFIF2ZAajnioFwEr62KHZxFDC_MT4Y-8RRGDszlTAjqYrGKCtpOzkd0ko1qmMhRhHnYjGGAkFHiQf7",
  eggrollTray: "https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RHK_SFuhklJ5_o_0l_mD0OXdohgx6iOAjC1lubzAc6g5HG9lPusLGTlosimLVoGJbsPzxIvANHEWvZJmH7pPJ_IhmSz9MDwtkqDNRgl-YEm_f9sRK1RUk-58hdlDrQY1DhbJtn",
};

export const PHOTO_SOURCE_URL = "https://www.google.com/maps/search/?api=1&query=Thinh+An+Kitchen+%26+Tofu+8104+W+Waters+Ave+Tampa";

export function sized(url: string, w = 800, h = 600) {
  return `${url}=w${w}-h${h}-n-k-no`;
}

export function photoFor(id: string) {
  const p = PHOTOS[id];
  if (!p) return null;
  return {
    ...p,
    src: sized(p.url),
    credit: p.by === "owner" ? "Photo: Thịnh An Kitchen & Tofu on Google Maps" : "Customer photo via Google Maps",
  };
}

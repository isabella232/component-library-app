/* eslint-disable @next/next/no-img-element */
export const Element = (
  <header
    style={{
      display: "block",
      marginTop: "0",
      marginRight: "0",
      marginBottom: "0",
      marginLeft: "0",
      paddingTop: "0",
      paddingRight: "0",
      paddingBottom: "0",
      paddingLeft: "0",
      width: "auto",
      height: "auto",
      position: "static",
    }}
  >
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "20px",
        paddingBottom: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: "1140px",
        overflowX: "visible",
        overflowY: "visible",
        objectFit: "fill",
        position: "relative",
      }}
      aria-label="Global"
    >
      <div
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          maxWidth: "1260px",
          minHeight: "30px",
          position: "static",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            position: "static",
            width: "auto",
            height: "auto",
          }}
        >
          <div style={{ display: "block", width: "auto", height: "auto" }}>
            <img
              alt="logo"
              src="https://placehold.co/141x36"
              style={{ width: "auto", height: "auto", display: "inline-block" }}
            />
          </div>
          <div style={{ display: "block" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "24px",
              }}
            >
              <a
                href="#"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  lineHeight: "1.5",
                  color: "#2C2C2C",
                }}
              >
                Features
              </a>
              <a
                href="#"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  lineHeight: "1.5",
                  color: "#2C2C2C",
                }}
              >
                Pricing
              </a>
              <a
                href="#"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  lineHeight: "1.5",
                  color: "#2C2C2C",
                }}
              >
                Contact
              </a>
            </div>
          </div>
          <div
            style={{
              display: "block",
              justifyContent: "flex-end",
            }}
          >
            <a
              href="#"
              style={{
                fontSize: "0.875rem",
                fontWeight: "bold",
                lineHeight: "1.5",
                color: "#2C2C2C",
              }}
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

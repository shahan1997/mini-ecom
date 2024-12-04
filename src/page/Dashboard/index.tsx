import {
  AppBar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";
import { selectEnableAuth } from "../SignUp/components/AuthSelector";
import { setDisableAuth } from "../SignUp/components/AuthSlice";
import { appColors } from "../../theme/appColors";
import SearchIcon from "@mui/icons-material/Search";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useMemo } from "react";
import { getPriceFormatCodeToSymbol } from "../../core/utils";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import {
  IAddCount,
  IAddPackageCount,
  IProductData,
} from "../../core/property.interface";
import { addItem, BasketItem } from "./store/BasketSlice";
import { selectBasketItems } from "./store/BasketSelector";
import productDataMemo from "../../store/productData";
import products from "../../store/products";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    navigate("/shoppingCart");
  };

  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const authEnable = useSelector(selectEnableAuth);
  const dispatch = useDispatch();
  console.log("authEnable store from Dashboard:", authEnable);
  const existingUsersString = localStorage.getItem("userDetails1");
  console.log("User authorized:", existingUsersString);
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return productDataMemo?.records.filter((re) => {
      const productName = re.name.toLowerCase();
      const productCode = re.categoryName.toLowerCase();
      return productName.includes(query) || productCode.includes(query);
    });
  }, [productDataMemo, searchQuery]);

  const handleLogout = () => {
    // Reset authorization state
    dispatch(setDisableAuth());
    console.log("User logged out. Token removed.");
  };
  const addItemToCard = (item: IProductData) => {
    const basketItem: BasketItem = { ...item, count: 1 };
    dispatch(addItem(basketItem));
    console.log("Updated product with new unit price:", basketItem);
  };
  const addPackageItemToCard = (item: IAddPackageCount) => {
    const itemCount: IAddCount = {
      id: item.id,
      categoryName: item.name,
      name: item.name,
      count: 1,
      unitPrice: item.discountPrice,
      imageUrl: item.image,
    };
    dispatch(addItem(itemCount));
  };
  const selectItem = useSelector(selectBasketItems);
  return (
    <Box p={2}>
      <AppBar position="static" color="default" elevation={0} sx={{ mb: 3 }}>
        <Toolbar>
          <img
            src={
              "https://i.ibb.co/cTCzD3n/istockphoto-1125921857-612x612-removebg-preview.png"
            }
            alt="Logo"
            style={{ height: 60 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 400 }}
          >
            DECO
          </Typography>
          <IconButton
            color="inherit"
            aria-label="shopping cart"
            onClick={handleSignUpClick}

            // onClick={handleLogout}
          >
            <Badge
              badgeContent={selectItem.length}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": {
                  right: 2,
                  top: 11,
                  backgroundColor: appColors.orange[50],
                },
              }}
            >
              <ShoppingCartIcon
                sx={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </Badge>
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid key={index} size={{ xs: 12, sm: 12, md: 4 }}>
            <Card
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row", // Ensures horizontal layout
                alignItems: "center",
                boxShadow: "none", // Remove elevation/shadow if not needed
                border: "none", // Optional for a clean look
                p: 1,
                backgroundColor: appColors.greyLight,
                m: 0,

                elevation: 0,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  // width: "70%",
                  // height: "100%",
                  // width: 100,
                  // height: 100,
                  objectFit: "contain",
                  height: "150px",
                  margin: "0",
                  width: { sm: "40%", xs: "30%", md: "60%" },
                }}
                src={product.image}
                // src={require("../../../src/assets/images/signup.jpg")}
                alt={product.name}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center", // Centers the content vertically
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 400, fontSize: "1.4rem" }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: appColors.grey,
                  }}
                  gutterBottom
                >
                  {product.description}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 300, fontSize: "1rem" }}
                  >
                    {getPriceFormatCodeToSymbol(product.discountPrice)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      textDecoration: "line-through",
                      fontWeight: 300,
                      fontSize: "0.7rem",
                    }}
                  >
                    {getPriceFormatCodeToSymbol(product.actualPrice)}
                  </Typography>
                </Box>
                <Button
                  sx={{
                    width: "180px",
                    fontSize: "10px",
                    mt: 1,

                    color: appColors.white,
                    "&:hover": {
                      bgcolor: appColors.grey,
                      color: appColors.black[100],
                    },
                  }}
                  type="submit"
                  variant="contained"
                  startIcon={<ShoppingCartIcon style={{ fontSize: "10px" }} />}
                  onClick={() => addPackageItemToCard(product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
              <CardContent></CardContent>
            </Card>
          </Grid>
        ))}{" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "2rem" }}>
            FEATURED PRODUCTS
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search for a product"
            onChange={handleSearchInputChange}
            value={searchQuery}
            sx={{
              width: {
                xs: "100%",
                sm: "50%",
                md: "60%",
                lg: "50%",
              },
              mr: 2,
              borderRadius: "20px",
              bgcolor: appColors.greyLight,
              "& .MuiOutlinedInput-root": {
                // borderRadius: "50px",
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "16px",
                opacity: 0.7,
                fontWeight: 500,
              },
            }}
          />
        </Box>
        {/* //Tab table */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                aria-label="Product Categories"
                onChange={handleChange}
                scrollButtons="auto"
                sx={{
                  minWidth: "200px",
                  width: "100%",
                  "& .Mui-selected.MuiTab-root": {
                    color: appColors.darkGray[90],
                    fontSize: 20,
                    fontWeight: 700,
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: appColors.darkGray[90],
                  },
                  "& .MuiTab-root": {
                    color: appColors.darkGray[40],
                    fontSize: 15,
                    fontWeight: 700,
                  },
                }}
                variant="scrollable"
              >
                <Tab label="ALL" value="1" />
                {["Sofa", "Table", "Lamp", "Wall Art"].map(
                  (category, index) => (
                    <Tab
                      key={index}
                      label={category}
                      value={String(index + 2)}
                    />
                  )
                )}
              </TabList>
            </Box>
            <TabPanel
              value="1"
              sx={{
                overflowY: "auto",
              }}
            >
              <Grid container spacing={2}>
                {(searchQuery ? filteredProducts : productDataMemo.records).map(
                  (re, index) =>
                    re.isEnabled && (
                      <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Card
                          key={index}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "none",
                            border: "none",
                            p: 1,
                            backgroundColor: appColors.greyLight,
                            m: 0,
                            elevation: 0,
                          }}
                          // onClick={() => addItemToCard(re)}
                        >
                          <CardContent
                            sx={{
                              gap: 0,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="h6">{re.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {re.description || "No description available"}
                            </Typography>
                          </CardContent>
                          <CardMedia
                            component="img"
                            src={re.imageUrl}
                            //  src={require("../../../src/assets/images/signup.jpg")}
                            alt={re.name}
                            sx={{
                              height: "150px",
                              objectFit: "contain",
                              mb: 2,
                            }}
                          />
                          <CardContent
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: appColors.black[100],
                                fontWeight: 400,
                              }}
                            >
                              {getPriceFormatCodeToSymbol(re.unitPrice)}
                            </Typography>
                            <Button
                              fullWidth
                              sx={{
                                mt: 3,
                                mb: 2,
                                color: appColors.white,
                                "&:hover": {
                                  bgcolor: appColors.grey,
                                  color: appColors.black[100],
                                },
                              }}
                              type="submit"
                              variant="contained"
                              startIcon={<ShoppingCartIcon />}
                              onClick={() => addItemToCard(re)}
                            >
                              Add to Cart
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                )}
              </Grid>
            </TabPanel>
            {["Sofa", "Table", "Lamp", "Wall Art"].map((category, index) => (
              <TabPanel
                key={index}
                value={String(index + 2)}
                sx={{
                  overflowY: "auto",
                }}
              >
                <div>
                  <Grid container spacing={2}>
                    {(searchQuery ? filteredProducts : productDataMemo.records)
                      .filter((re) => re.categoryName === category)
                      .map(
                        (re, productIndex) =>
                          re.isEnabled && (
                            <Grid
                              key={productIndex}
                              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                            >
                              <Card
                                key={index}
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: "none",
                                  border: "none",
                                  p: 1,
                                  backgroundColor: appColors.greyLight,
                                  m: 0,
                                  elevation: 0,
                                }}
                                //onClick={() => addItemToCard(re)}
                              >
                                <CardContent
                                  sx={{
                                    gap: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  <Typography variant="h6" gutterBottom>
                                    {re.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                  >
                                    {re.description ||
                                      "No description available"}
                                  </Typography>
                                </CardContent>
                                <CardMedia
                                  component="img"
                                  src={re.imageUrl}
                                  // src={require("../../../src/assets/images/signup.jpg")}
                                  alt={re.name}
                                  sx={{
                                    height: "150px",
                                    objectFit: "contain",
                                    mb: 2,
                                  }}
                                />
                                <CardContent
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      color: appColors.black[100],
                                      fontWeight: 400,
                                    }}
                                  >
                                    {getPriceFormatCodeToSymbol(re.unitPrice)}
                                  </Typography>
                                  <Button
                                    sx={{
                                      mt: 3,
                                      mb: 2,
                                      color: appColors.white,
                                      "&:hover": {
                                        bgcolor: appColors.grey,
                                        color: appColors.black[100],
                                      },
                                    }}
                                    type="submit"
                                    variant="contained"
                                    startIcon={<ShoppingCartIcon />}
                                    onClick={() => addItemToCard(re)}
                                  >
                                    Add to Cart
                                  </Button>
                                </CardContent>
                              </Card>
                            </Grid>
                          )
                      )}
                  </Grid>
                </div>
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;

# hostR

Deploy your R models easily to showcase your model or make it available via API.

> :warning: **Note**: This repository is still in an early stage of development and isn't functional yet. We love the open source community and want to show what we are working on early. We will update this readme with more information once it is safe to use. Until then, feel free to share your thoughts, contact us, and contribute if you'd like.

---

## How to use

Install the package from GitHub (If you don't have devtools, install it first: `install.packages("devtools")`):

```
devtools::install_github("stackOcean-official/hostr")
```

In your code load the hostR package and after hand the model to our `host` function

```r
library(hostr)

# Your code loading data and building your model
log_reg = glm(...)
predict(log_reg, newdata = mydata)

host(log_reg)
```

---

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a pull request

## License

Distributed under the AGPLv3 License. See `LICENSE` for more information.

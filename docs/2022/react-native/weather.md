---
sidebar_position: 1
---

# 初识 react-native 实现天气预报

<img src="/img/react-native/weather/newyork.png" width="300px" style={{marginRight: '2em'}}/>
<img src="/img/react-native/weather/chengdu.png" width="300px" />

[github](https://github.com/cyhfe/weather)

## api 接口

项目需要用到 `metaweather` 提供的 api，直接请求存在跨域问题。

因为服务端没有跨域限制，所以我决定用 express 搭个服务器处理请求问题。

要想在 node 中使用 esm 的语法，需要在 pakage.json 添加`"type": "module"`.

且文件后缀不能省略`.js`

```js title="app.js"
import express from "express"
import cors from "cors"
import morgan from "morgan"

import { getLocation, getWeather } from "./controller.js"

const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.get("/location", getLocation)
app.get("/weather", getWeather)

export default app
```

```js title="controller.js"
import axios from "axios"

async function getLocation(req, res) {
  const { city } = req.query
  const response = await axios.get(
    `https://www.metaweather.com/api/location/search/?query=${city}`
  )
  res.status(200).json(response.data)
}

async function getWeather(req, res) {
  const { woeid } = req.query
  const response = await axios.get(
    `https://www.metaweather.com/api/location/${woeid}`
  )

  res.status(200).json(response.data)
}

export { getLocation, getWeather }
```

## react-native

与 react 心智模型基本一致。

开发环境的配置较为繁琐。

手机局域网请求本地接口要使用 ip 地址

```js
const response = await fetch(
  `http://192.168.31.133:3000/weather?woeid=${woeid}`
)
```

还需要熟悉`debug`,`core components`以及样式的调整

```jsx title="app.js"
import React, { useEffect, useState } from "react"
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from "react-native"

import { SearchInput } from "./src/components/searchInput"
import useAsync from "./src/hooks/useAsync"
import { textSize } from "./src/utils/style"
import getImageForWeather from "./src/utils/getImageForWeather"
import { fetchLocationId, fetchWeather } from "./src/utils/api"

const App = () => {
  const [location, setLocation] = useState("Beijing")
  const { data, error, isLoading, run } = useAsync()

  const renderWeather = () => {
    const { location, weather, temperature } = data
    return (
      <>
        <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
        <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(
          temperature
        )}°`}</Text>
      </>
    )
  }
  useEffect(() => {
    const promise = fetchLocationId(location).then((locationId) => {
      if (!locationId) {
        return Promise.reject("不支持的地区")
      } else {
        return Promise.resolve(fetchWeather(locationId))
      }
    })

    run(promise)
  }, [location])
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={data ? getImageForWeather(data.weather) : null}
        imageStyle={styles.image}
        style={styles.imageContainer}
        resizeMode="cover"
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={isLoading} color="white" size="large" />
          {!isLoading && (
            <View style={styles.contentContainer}>
              {data && renderWeather()}
              {error && (
                <Text style={[styles.error, styles.smallText]}>{error}</Text>
              )}
              <SearchInput onSubmit={setLocation} />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },
  largeText: {
    fontSize: textSize.large,
  },
  smallText: {
    fontSize: textSize.small,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  error: {
    color: "red",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white",
  },
})

export default App
```

```jsx title="searchInput.js"
import { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"

export function SearchInput({ onSubmit }) {
  const [input, setInput] = useState("")
  const handleSubmit = (text) => {
    if (!input) return
    onSubmit(input)
    setInput("")
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="select a city"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 40,
    marginTop: 20,
    backgroundColor: "#eee",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: "black",
  },
})
```

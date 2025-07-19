# CoffeesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**coffeesControllerCreate**](#coffeescontrollercreate) | **POST** /coffees | |
|[**coffeesControllerFindAll**](#coffeescontrollerfindall) | **GET** /coffees | |
|[**coffeesControllerFindOne**](#coffeescontrollerfindone) | **GET** /coffees/{id} | |
|[**coffeesControllerRemove**](#coffeescontrollerremove) | **DELETE** /coffees/{id} | |
|[**coffeesControllerUpdate**](#coffeescontrollerupdate) | **PATCH** /coffees/{id} | |

# **coffeesControllerCreate**
> Coffee coffeesControllerCreate(createCoffeeDto)


### Example

```typescript
import {
    CoffeesApi,
    Configuration,
    CreateCoffeeDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CoffeesApi(configuration);

let createCoffeeDto: CreateCoffeeDto; //

const { status, data } = await apiInstance.coffeesControllerCreate(
    createCoffeeDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCoffeeDto** | **CreateCoffeeDto**|  | |


### Return type

**Coffee**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **coffeesControllerFindAll**
> Array<Coffee> coffeesControllerFindAll()


### Example

```typescript
import {
    CoffeesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoffeesApi(configuration);

let limit: number; // (default to undefined)
let offset: number; // (default to undefined)

const { status, data } = await apiInstance.coffeesControllerFindAll(
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | defaults to undefined|
| **offset** | [**number**] |  | defaults to undefined|


### Return type

**Array<Coffee>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**403** | Forbidden. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **coffeesControllerFindOne**
> Coffee coffeesControllerFindOne()


### Example

```typescript
import {
    CoffeesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoffeesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.coffeesControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**Coffee**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **coffeesControllerRemove**
> Coffee coffeesControllerRemove()


### Example

```typescript
import {
    CoffeesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoffeesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.coffeesControllerRemove(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**Coffee**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **coffeesControllerUpdate**
> Coffee coffeesControllerUpdate(body)


### Example

```typescript
import {
    CoffeesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoffeesApi(configuration);

let id: number; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.coffeesControllerUpdate(
    id,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

**Coffee**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


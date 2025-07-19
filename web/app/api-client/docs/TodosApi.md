# TodosApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**todosControllerCreate**](#todoscontrollercreate) | **POST** /todos | |
|[**todosControllerFindAll**](#todoscontrollerfindall) | **GET** /todos | |
|[**todosControllerFindOne**](#todoscontrollerfindone) | **GET** /todos/{id} | |
|[**todosControllerRemove**](#todoscontrollerremove) | **DELETE** /todos/{id} | |
|[**todosControllerUpdate**](#todoscontrollerupdate) | **PATCH** /todos/{id} | |

# **todosControllerCreate**
> Todo todosControllerCreate(createTodoDto)


### Example

```typescript
import {
    TodosApi,
    Configuration,
    CreateTodoDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TodosApi(configuration);

let createTodoDto: CreateTodoDto; //

const { status, data } = await apiInstance.todosControllerCreate(
    createTodoDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTodoDto** | **CreateTodoDto**|  | |


### Return type

**Todo**

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

# **todosControllerFindAll**
> Array<Todo> todosControllerFindAll()


### Example

```typescript
import {
    TodosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TodosApi(configuration);

const { status, data } = await apiInstance.todosControllerFindAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Todo>**

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

# **todosControllerFindOne**
> Todo todosControllerFindOne()


### Example

```typescript
import {
    TodosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TodosApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.todosControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**Todo**

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

# **todosControllerRemove**
> todosControllerRemove()


### Example

```typescript
import {
    TodosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TodosApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.todosControllerRemove(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **todosControllerUpdate**
> Todo todosControllerUpdate(body)


### Example

```typescript
import {
    TodosApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TodosApi(configuration);

let id: number; // (default to undefined)
let body: object; //

const { status, data } = await apiInstance.todosControllerUpdate(
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

**Todo**

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


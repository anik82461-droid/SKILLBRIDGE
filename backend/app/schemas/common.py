from typing import Generic, Literal, TypeVar

from pydantic import BaseModel

DataT = TypeVar("DataT")


class ApiSuccess(BaseModel, Generic[DataT]):
    success: Literal[True] = True
    data: DataT
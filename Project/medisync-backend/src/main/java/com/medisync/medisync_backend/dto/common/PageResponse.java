package com.medisync.medisync_backend.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {

    private List<T> data;

    private int currentPage;

    private int pageSize;

    private long totalElements;

    private int totalPages;

    private boolean hasNext;

    private boolean hasPrevious;
}
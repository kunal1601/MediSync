package com.medisync.medisync_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medisync.medisync_backend.entity.PharmacistLeave;

public interface PharmacistLeaveRepository extends JpaRepository<PharmacistLeave, Long> {

	@Query("""
	        SELECT
	            CONCAT(p.firstName, ' ', p.lastName),
	            p.workingShift,
	            l.leaveReason,
	            l.leaveType
	        FROM PharmacistLeave l
	        JOIN l.pharmacist p
	        WHERE l.leaveDate = :date
	        AND l.status = 'APPROVED'
	        """)
	List<Object[]> getLeavesByDate(@Param("date") LocalDate date);
	
	@Query("""
			SELECT l.leaveDate
			FROM PharmacistLeave l
			WHERE YEAR(l.leaveDate)=:year
			AND MONTH(l.leaveDate)=:month
			AND l.status='APPROVED'
			""")
	List<LocalDate> getLeaveDates(
			        @Param("year") int year,
			        @Param("month") int month);
}

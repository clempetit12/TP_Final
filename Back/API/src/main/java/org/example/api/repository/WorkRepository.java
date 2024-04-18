package org.example.api.repository;

import org.example.api.entity.WorkTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends JpaRepository<Long, WorkTime> {

}
